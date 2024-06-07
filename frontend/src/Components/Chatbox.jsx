import React, { useEffect } from 'react'
import SendMessage from './SendMessage';
import Chats from './Chats';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenUser } from '../redux/userSlice';

export default function Chatbox() {
  const dispatch=useDispatch();
  const { authenticatedUser,chosenUser,onlineUsers } = useSelector((store) => store.user);
 const isOnline = onlineUsers?.includes(chosenUser?._id);
  return (
    <>
      {chosenUser !== null ? (
        <div className="md:min-w-[500px] flex flex-col">
          <div className="flex gap-2 items-center bg-customCyan-500 px-4 py-2 mb-2 mt-2 ml-2 mr-2 rounded-md">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="rounded-full w-14">
                <img src={chosenUser?.profilePhoto} alt="user-dp"></img>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center gap-2 flex-1">
                <p>{chosenUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Chats />
          <SendMessage />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">
            Hi,{authenticatedUser?.fullName}{" "}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation.</h1>
        </div>
      )}
    </>
  );
}
