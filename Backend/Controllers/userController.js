import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(!fullName||!username||!password||!confirmPassword||!gender){
            return res.status(400).json({message:"Please enter required details"});
        }
        if(password !==confirmPassword){
            return res.status(400).json({message:"Password doesnot match,Please Check"});
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists, please try different username"});
        }
        const hiddenPassword=await bcrypt.hash(password,1);
        const femalePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const malePhoto =`https://avatar.iran.liara.run/public/boy?username=${username}`;
        await User.create({
            fullName,
            username,
            password:hiddenPassword,
            profilePhoto:gender==="female"?femalePhoto:malePhoto,
            gender
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        })
    }
catch(error){
console.log(error);
}
}
export const login = async (req, res) => {
  try {
   const {username,password}=req.body;
   if(!username||!password){
    return res.status(400).json({message:"Enter required details"});

   }
   const user=await User.findOne({username});
   if(!user){
    return res.status(400).json({
        message:"Please enter correct credentials.",
        success:false
    })
   }
   const passwordMatch=await bcrypt.compare(password,user.password);
   if(!passwordMatch){
     return res.status(400).json({
       message: "Please enter correct credentials.",
       success: false,
     });

   }
   const authToken={
    userID:user._id
   }
   const token=await jwt.sign(authToken,process.env.jwtKey,{expiresIn:'1d'})
  
 //save in browser cookies
 return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
    _id:user._id,
    username:user.username,
    fullName:user.fullName,
    profilePhoto:user.profilePhoto
 })

} catch (error) {
    console.log(error);
  }
};
export const logout=(req,res)=>{
    try{
return res.status(200).cookie("token","",{maxAge:0}).json({message:"Logged out successfully."})
    }
    catch(error){
        console.log(error);

    }
};
export const otherUsers=async(req,res)=>{
    try{
const loggedinUser=req.id;
const otherUsers=await User.find({_id:{$ne:loggedinUser}}).select("-password");
  return res.status(200).json(otherUsers);
}
    catch(error){
        console.log(error);

    }
}