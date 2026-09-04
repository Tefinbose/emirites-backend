const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        // check the token is present
        if(!authHeader){
            return res.status(401).json({message:"Authorization token required"})
        }
        const token = authHeader.split(" ")[1]

        if(!token){
            res.status(401).json({message:"Invalid token"})
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.userId = decoded.userId;
        req.role = decoded.role;
        
        next()
        
    } catch (error) {
        return res.status(500).json({message:"Unauthorized"})
        
    }
}

module.exports = authMiddleware