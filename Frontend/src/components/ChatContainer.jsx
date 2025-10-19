import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ChatContainer = () => {
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
    <div className="flex flex-col h-full max-h-screen p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-4">Chat Container</h1>
    
      <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-white rounded-lg shadow-inner">
        {chats.map((chat) => (
          <div key={chat._id} className="p-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">
              {chat?.username?.firstname + " " + chat?.username?.lastname}
            </p>
            <p className="text-xs text-gray-500">{chat?.email}</p>
          </div>
        ))}
      </div>
    
      <div className="mt-4 flex items-center gap-2">
        <textarea
          name="textarea"
          id="textarea"
          placeholder="Type a message..."
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatContainer