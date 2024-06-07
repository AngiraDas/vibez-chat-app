import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChosenUser } from '../redux/userSlice';

export default function UserList({user}) {
  const dispatch=useDispatch();
  const {chosenUser,onlineUsers}=useSelector(store=>store.user);
  const isOnline=onlineUsers?.includes(user._id);
  const chosenUserHandle=(user)=>{
dispatch(setChosenUser(user));
  }
  return (
    <>
      <div onClick={()=>chosenUserHandle(user)}  className={` ${chosenUser?._id===user?._id?' bg-customTeal-500':''} flex gap-2 items-center hover:bg-customTeal-500 rounded-full p-2 cursor-pointer`}>
        <div className={`avatar ${isOnline?'online':''}`}>
          <div className="rounded-full w-14">
            <img
              src={user?.profilePhoto}
              alt="user-dp"
            ></img>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2 flex-1">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}
