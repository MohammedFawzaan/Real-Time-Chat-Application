import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Messages from './Messages';
import { toast } from 'react-hot-toast';
import { UserDataContext } from '../context/UserContext';

const ChatContainer = ({ selectedChat }) => {
  const { user } = useContext(UserDataContext);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedChat?._id)
      return;
    const getAllMessages = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/get/${selectedChat?._id}`, {
        withCredentials: true
      });
      setAllMessages(response.data.allMessages);
    }
    getAllMessages();
  }, [selectedChat]);

  const handleSend = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/messages/send/${selectedChat?._id}`,
      { "text": message },
      { withCredentials: true }
    );
    toast.success(response.data.notify);
    setMessage("");
    setAllMessages((prev) => {
      return [...prev, response.data.message]
    });
  }

  if (!selectedChat)
    return <div className="flex-1 flex flex-col p-4">
      <h2 className="text-lg text-center font-bold text-indigo-600 mb-2">Select A Person To Chat with!!!</h2>
    </div>

  return (
    <div className="flex-1 flex flex-col p-4">
      {(selectedChat?.email === user?.userData?.email) ? 
        <h2 className="text-lg font-semibold text-indigo-600 mb-2"> </h2> :
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">{selectedChat?.username?.firstname+" "+selectedChat?.username?.lastname}</h3>
      }
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
        {allMessages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No Messages Yet...</p>) :
          (allMessages.map((message) => (
            <div
              key={message._id}
              className={`flex mb-2 ${message.receiverId._id === user.userData._id ? 'justify-start' : 'justify-end'}`}>
              <p className={`max-w-[70%] p-3 text-sm break-words ${message.receiverId._id === user.userData._id
                ? 'bg-gray-200 text-gray-800 rounded-r-xl rounded-tl-xl'
                : 'bg-blue-500 text-white rounded-l-xl rounded-tr-xl'
                }`}>{message?.text}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <textarea
          placeholder="Type a message..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatContainer