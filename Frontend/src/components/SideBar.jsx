import React, { useContext, useState } from 'react'
import { useEffect } from "react"
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const SideBar = ({ setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/chats`, {
          withCredentials: true
        });
        setChats(response.data.allUser);
      } catch (error) {
        console.log(error);
      }
    }
    getAllChats();
  }, []);

  const handleClick = (chat) => {
    setSelectedChat(chat);
  }

  return (
    <div className="w-1/5 md:w-1/4 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-3">All Chats</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat._id} 
            onClick={() => handleClick(chat)}
            className="p-2 rounded-md hover:bg-gray-100 active:bg-gray-300 cursor-pointer">
            {(chat?.email === user?.userData?.email) ?
            <p className="text-sm font-medium">You</p> :
            <p className="text-sm font-medium">
              {chat?.username?.lastname}
            </p>}
            <p className="text-xs text-gray-500">{chat?.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar