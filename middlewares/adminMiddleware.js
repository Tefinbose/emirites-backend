const authMiddleware = require("./authMiddleware");

const adminMiddleware = async(req,res,next)=>{
    if(req.role !== "admin"){
        res.status(403).json({message:"Admin access only"})
    }
    next();
}
module.exports = authMiddleware