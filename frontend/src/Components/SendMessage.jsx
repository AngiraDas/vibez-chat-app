import React, {  useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
export default function SendMessage() {
 
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const {chosenUser}=useSelector(store=>store.user);
  const {messages}=useSelector(store=>store.message);
  const onSubmitHandle=async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${chosenUser?._id}`,{message}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true}
      );
       dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
     setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandle} className="px-4 my-3 mb-4 ">
      <div className="w-full relative">
        <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
          type="text"
          placeholder="Send Message"
          className="text-sm rounded-md block w-full border p-3"
        ></input>
        <button type="submit" className="absolute flex inset-y-0 end-0 pr-4 items-center">
          <BsFillSendFill />
        </button>
      </div>
    </form>
  );
}
