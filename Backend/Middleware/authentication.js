import jwt from "jsonwebtoken";
const authentication=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
       if(!token){
        return res.status(401).json({message:"User is not authenticated."})
       }
     const decoded=await jwt.verify(token,process.env.jwtKey);
        if(!decoded){
            return res.status(401).json({message:"Token is invalid"})
        }
        req.id=decoded.userID;

     next();
    }
    catch(error){
        console.log(error);
    }
}
export default authentication;