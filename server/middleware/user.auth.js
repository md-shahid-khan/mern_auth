import jsonwebtoken from "jsonwebtoken";


 const userAuth = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.token;
    if (!token) return res.json({success: false, message: "Not authenticated Login again"});
    try {

        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET);
        if (!decodedToken) return res.json({success: false, message: "Not authorized Login again"});

        req.body.userId = decodedToken.id;
        next();

    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Internal server error", type: error.message});
    }
}

export default userAuth;