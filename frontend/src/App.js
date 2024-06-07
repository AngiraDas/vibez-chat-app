import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../../frontend/src/Components/Signup";
import Login from "../../frontend/src/Components/Login";
import Home from "../../frontend/src/Components/Home";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
 
  const {authenticatedUser}=useSelector(store=>store.user);
    const {socket}=useSelector(store=>store.socket);
  const dispatch=useDispatch();
  useEffect(()=>{
if(authenticatedUser){

  const socket = io("http://localhost:8000", {
    query: {
      userId: authenticatedUser._id
    }
  });
  dispatch(setSocket(socket));
  socket.on("getOnlineUsers",(onlineUsers)=>{
dispatch(setOnlineUsers(onlineUsers))
  });
  return ()=>socket.close();
}
else{
  if(socket){
    socket.close();
    dispatch(setSocket(null));
  }
}},[authenticatedUser]
);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
