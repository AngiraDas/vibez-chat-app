import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticatedUser } from "../../../frontend/src/redux/userSlice";
export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "ContenT-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      Navigate("/");
      console.log(res.data);
      dispatch(setAuthenticatedUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-80 mx-auto">
      <div className="w-full p-5 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white-100">
        <h1 className="font-bold text-center text-3xl  ">Login</h1>
        <form onSubmit={onSubmitHandle} action="">
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

          <div className="flex items-center text-center w-full ml-5 mt-3">
            <p>Doesn't have an account? </p>
            <button className="btn btn-sm mx-2 border border-slate-600">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="btn btn-block btn-md mt-2  border border-slate-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
