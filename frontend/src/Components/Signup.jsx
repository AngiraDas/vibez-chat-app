import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import  toast from 'react-hot-toast';

export default function Signup() {
  const [user,setUser]=useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  })
  const Navigate=useNavigate();
  const checkboxHandle=(gender)=>{
    setUser({...user,gender})
  }
  const onSubmitHandle=async(e)=>{
    e.preventDefault();
   try {
    const res = await axios.post("http://localhost:8000/api/v1/user/register",user,{
      headers:{
        'ContenT-Type':'application/json'

      },
      withCredentials:true
    });

    if(res.data.success){
      Navigate("/login")
      toast.success(res.data.message);
    }
   } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
   }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }
  return (
    <div className="min-w-80 mx-auto">
      <div className="w-full p-5 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white-100">
        <h1 className="font-bold text-center text-3xl  ">Sign Up</h1>
        <form onSubmit={onSubmitHandle} action="">
          <div>
            <label className="label p-3">
              <span className="text-base text-center label-text">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="h-10 w-full input input-bordered "
              type="text"
              placeholder="Full Name"
            ></input>
          </div>
          <div>
            <label className="label p-3">
              <span className="text-base text-center label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="h-10 w-full input input-bordered "
              type="text"
              placeholder="Username"
            ></input>
          </div>
          <div>
            <label className="label p-3">
              <span className="text-base text-center label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="h-10 w-full input input-bordered "
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <div>
            <label className="label p-3">
              <span className="text-base text-center label-text">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="h-10 w-full input input-bordered "
              type="password"
              placeholder="Confirm Password"
            ></input>
          </div>
          <div className="flex items-center my-4  mx-16">
            <div className="flex items-center">
              <p>Female</p>
              <input
                checked={user.gender === "female"}
                onChange={() => checkboxHandle("female")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Male</p>
              <input
                checked={user.gender === "male"}
                onChange={() => checkboxHandle("male")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div className="flex items-center text-center w-full ml-5">
            <p>Already have an account? </p>
            <button className="btn btn-sm mx-2 border border-slate-600">
              <Link to="/login">Login</Link>
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="btn btn-block btn-md mt-2  border border-slate-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
