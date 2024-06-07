import React ,{useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
export default function useGetMessages() {
    const {chosenUser}=useSelector(store=>store.user);
    const dispatch =useDispatch();


  useEffect(()=>{
    const fetchMessages = async () => {
try {
    axios.defaults.withCredentials=true;
    const res = await axios.get(
      `http://localhost:8000/api/v1/message/${chosenUser?._id}`
    );
    console.log(res);
    dispatch(setMessages(res.data))
    
} catch (error) {
    console.log(error);
}
    }
fetchMessages();
    }
  ,[chosenUser])
  
}
