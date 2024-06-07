import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import OtherUsersList from './OtherUsersList';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUser, setOtherUsers } from "../redux/userSlice";
export default function Sidebar() {
  
   const [search, setSearch] = useState("");
   const {otherUsers}=useSelector(store=>store.user);
   const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandle=async()=>{
    try {
      const res=await axios.get('http://localhost:8000/api/v1/user/logout');
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthenticatedUser(null))
    } catch (error) {
      console.log(error);
    }
  }
  //  const searchSubmitHandler = (e) => {
  //    e.preventDefault();
  //    const chatUser = otherUsers?.find((user) =>
  //      user.fullName.toLowerCase().includes(search.toLowerCase())
  //    );
  //    if (chatUser) {
  //      dispatch(setOtherUsers([chatUser]));
  //    } else {
  //      toast.error("User not found!");
  //    }
  //  }
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      const chatUser = otherUsers?.find((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      if (chatUser) {
        toast.success("User found!");
      } else {
        toast.error("User not found!");
      }
    };

    const filteredUsers = otherUsers?.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
         className="flex items-center gap-2"
        action=""
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input  rounded-full"
          type="text"
          placeholder="Search"
        ></input>
        <button type="submit" className="btn btn-circle bg-#0d9488">
          <FaSearch size={20} />
        </button>
      </form>
      <div className="divider p-1"> </div>
      <OtherUsersList />
      <div className="mt-3 flex items-center">
        <button
          onClick={logoutHandle}
          className="btn btn-block btn-md mt-2  border border-slate-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
