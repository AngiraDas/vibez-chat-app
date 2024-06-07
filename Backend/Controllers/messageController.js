import { Chat } from "../Models/chatModel.js";
import { Message } from "../Models/messageModel.js";
import { getReceiverSocketId ,io} from "../socket/socket.js";

export const sendMessage=async (req,res)=>{
  
    try{
        const senderID=req.id;
        const receiverID=req.params.id;
        const {message}=req.body;
        let getChats=await Chat.findOne({
            members:{$all :[senderID,receiverID]}

        });
        if(!getChats){
            getChats=await Chat.create({
                members:[senderID,receiverID]
            })
        }
        const newMessage=await Message.create({
            senderID,receiverID,message
        });
        if(newMessage){
            getChats.messages.push(newMessage._id);

        }
         await Promise.all([getChats.save(), newMessage.save()]);

        //socket.io
      const receiverSocketId = getReceiverSocketId(receiverID);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
       

        return res.status(201).json({newMessage})
    }
    catch(error){
        console.log(error);
    }
}
export const receiveMessage=async(req,res)=>{
    try{
        const senderID=req.id;
        const receiverID=req.params.id;
        const chat=await Chat.findOne({
            members:{$all :[senderID,receiverID]}
        }).populate("messages");
        return res.status(200).json(chat?.messages);

    }
    catch(error){
        console.log(error);
    }
}