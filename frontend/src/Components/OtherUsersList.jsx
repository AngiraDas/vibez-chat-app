import React from "react";
import UserList from "./UserList";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
export default function OtherUsersList() {
    useGetOtherUsers();
    const {otherUsers}=useSelector(store=>store.user);
    if(!otherUsers) return;
  return (

    <div className="overflow-auto flex-1">
    {
      otherUsers?.map((user)=>{
        return (<UserList key={user._id} user={user}/>
      )
    })}
    
    </div>
  );
}
