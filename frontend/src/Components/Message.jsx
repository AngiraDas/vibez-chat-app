import React,{useRef,useEffect} from 'react'
import { useSelector } from 'react-redux';

export default function Message({message}) {
   const scroll = useRef();
 

 
  const { authenticatedUser,chosenUser } = useSelector((store) => store.user);
    useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
  return (
    <div
      ref={scroll}
      className={`chat ${
        message?.senderID === authenticatedUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderID === authenticatedUser?._id
                ? authenticatedUser?.profilePhoto
                : chosenUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div
        className={`chat-bubble ${
          message?.senderID === authenticatedUser?._id
            ? "bg-customCyan-300 text-black"
            : "bg-customCyan-700 "
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
}
