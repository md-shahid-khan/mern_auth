import userModel from '../model/user.model.js';

const safeUser = `  -password 
                           -verifyOtp 
                           -verifyOtpExpireAt 
                           -resetOtp 
                           -resetOtpExpireAt`
export const getUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find().select(safeUser);
        if (!allUsers) return res.json({success: false, message: "Something went wrong"});

        return res.json({success: false, users: allUsers});

    } catch (errors) {
        return res.json({success: false, message: errors.message});
    }
}

export const getUserById = async (req, res) => {
    const {userId} = req.body;
    if (!userId) return res.json({success: false, message: "Provide some valid Id"});

    try {
        const findUser = await userModel.findById({userId}).select(safeUser);
        if (!findUser) return res.json({success: false, message: "Something went wrong! No user found"});

        return res.json({success: true, user: findUser})


    } catch (errors) {
        return res.json({success: false, message: errors.message});
    }

}

export const getUserByEmail = async (req, res) => {

    const {email} = req.body;
    if (!email) return res.json({success: false, message: "Provide some valid Id"});

    try {
        const findUser = await userModel.findOne({email}).select(safeUser);
        if (!findUser) return res.json({success: false, message: "Something went wrong! No user found"});

        return res.json({success: true, user: findUser})


    } catch (errors) {
        return res.json({success: false, message: errors.message});
    }

}
