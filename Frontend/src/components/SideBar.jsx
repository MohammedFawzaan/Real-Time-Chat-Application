import React, { useState } from 'react'
import { useEffect } from "react"
import axios from 'axios';

const SideBar = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/chats`, {
          withCredentials: true
        });
        console.log(response.data);
        setChats(response.data.allUser);
      } catch (error) {
        console.log(error);
      }
    }
    getAllChats();
  }, []);

  return (
    <div className="w-1/5 md:w-1/4 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-3">All Chats</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <p className="text-sm font-medium">
              {chat?.username?.lastname}
            </p>
            <p className="text-xs text-gray-500">{chat?.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar