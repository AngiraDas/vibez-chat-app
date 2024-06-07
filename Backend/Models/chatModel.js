import  mongoose from "mongoose";
 const chatModel = new mongoose.Schema(
   {
     members: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
       },
     ],
     messages: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Message",
       },
     ],
   },
   {
     timestamps: true,
   }
 );
 export const Chat=mongoose.model("Chat",chatModel);