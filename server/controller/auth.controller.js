import userModel from '../model/user.model.js'
import bcrypt from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken'
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.json({success: false, message: "Missing some values"});

    }

    try {

        const existingUser = await userModel.findOne({email});

        if (existingUser) return res.json({success: false, message: "User already exist"});

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        const token = jsonwebtoken.sign({
            id: createUser._id,
            email: createUser.email,
            name: createUser.username
        }, JWT_SECRET, {
            expiresIn: "7d",

        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
            maxAge: 7 * 24 * 60 * 1000
        })

        //sending welcome email to user

        const mailerOption = {
            from: process.env.SENDER_EMAIL,
            to: createUser.email,
            subject: "Welcome to CoderBoyz.com",
            text: `Welcome to CoderBoyz.com website. Your account has been created with this email: ${createUser.email}`
        }

        try {
            await transporter.sendMail(mailerOption);
            console.log("Welcome email sent successfully");
        } catch (emailError) {
            console.error("Error sending email:", emailError.message);
            return res.json({success: false, message: "Error sending welcome email"});
        }

        return res.json({success: true, message: "User created successful", createUser});


    } catch (errors) {
        return res.json({success: false, message: errors.message, type: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({success: false, message: "Something went wrong "});

    }

    try {

        const findUser = await userModel.findOne({email});
        if (!findUser) return res.json({success: false, message: "User not found! with this email"})

        const isMatched = await bcrypt.compare(password, findUser.password);
        if (!isMatched) return res.json({success: false, message: "Something went wrong "});

        const token = jsonwebtoken.sign({
            id: findUser._id,
            email: findUser.email,
            name: findUser.username
        }, JWT_SECRET, {
            expiresIn: "7d",

        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
            maxAge: 7 * 24 * 60 * 1000
        });

        return res.json({success: true, message: "User login successful", findUser});


    } catch (errors) {
        return res.json({success: false, message: errors.message, type: "Internal Server Error"})
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
        })

        return res.json({success: true, message: "Logout successful"});

    } catch (errors) {
        return res.json({success: false, message: errors.message, type: "Internal Server Error"});
    }
}


export const sendingVerifyOtp = async (req, res) => {
    const {userId} = req.body;
    if (!userId) return res.json({success: false, message: "Something went wrong! Invalid Id"});

    try {

        const existingUser = await userModel.findById(userId);
        if (existingUser.isAccountVerified) return res.json({success: false, message: "Already verified"});

        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        existingUser.verifyOtp = OTP;
        existingUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await existingUser.save();

        const mailerOption = {
            from: process.env.SENDER_EMAIL,
            to: existingUser.email,
            subject: "Welcome to CoderBoyz.com",
            text: `Welcome to CoderBoyz.com website. Your email verification OTP is ${OTP} verify your email with this otp`
        }

        try {
            await transporter.sendMail(mailerOption);
            console.log("OTP send successful");
        } catch (emailError) {
            console.error("Error sending OTP in email:", emailError.message);
            return res.json({success: false, message: "Error sending OTP email"});
        }

        return res.json({success: true, message: "OTP send success"});


    } catch (errors) {
        return res.json({success: false, message: errors.message, type: "Internal Server Error"});
    }
}

export const verifyEmail = async (req, res) => {
    const {userId, userOtp} = req.body;

    if (!userId || !userOtp) return res.json({success: false, message: "Invalid OTP"});

    try {

        const user = await userModel.findById(userId);
        if (!user) return res.json({success: false, message: "No UserFound!"});

        if (user.isAccountVerified) return res.json({success: false, message: "Already verified!"});

        if (user.verifyOtp === userOtp) {
            if (user.verifyOtpExpireAt < Date.now()) return res.json({
                success: false,
                message: "Otp is expired request for new!"
            });
            user.isAccountVerified = true;
            user.verifyOtp = "";
            user.verifyOtpExpireAt = 0;
            await user.save();

        } else {
            return res.json({success: false, message: "Invalid otp try again"});
        }

        return res.json({success: true, message: "OTP verified success"});

    } catch (errors) {
        return res.json({success: false, message: errors.message, type: "Internal Server Error"});
    }


}
