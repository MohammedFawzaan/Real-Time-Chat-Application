import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { UserDataContext } from "../context/UserContext";

// ✅ Initialize socket globally (single instance)
const socket = io(import.meta.env.VITE_BASE_URL, { withCredentials: true });

const ChatContainer = () => {
  const { user } = useContext(UserDataContext);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  const bottomRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedChat = location?.state?.chat;
  console.log(selectedChat);

  // 🟢 Fetch messages whenever chat changes
  useEffect(() => {
    if (!selectedChat?._id) return;

    const getAllMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/messages/get/${selectedChat._id}`,
          { withCredentials: true }
        );
        setAllMessages(response.data.allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getAllMessages();
  }, [selectedChat]);

  // 🟢 Listen for real-time incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      // Verify the message belongs to this chat
      if (
        (data.senderId === selectedChat?._id &&
          data.receiverId === user?.userData?._id) ||
        (data.receiverId === selectedChat?._id &&
          data.senderId === user?.userData?._id)
      ) {
        setAllMessages((prev) => {
          const exists = prev.some((msg) => msg._id === data._id);
          if (exists) return prev;
          return [...prev, data];
        });
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedChat, user]);

  // Go to Bottom.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // 🟢 Send message (DB + Socket)
  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/messages/send/${selectedChat._id}`,
        { text: message },
        { withCredentials: true }
      );

      const newMsg = response.data.message;
      toast.success(response.data.notify);

      // Emit real-time event to others
      socket.emit("sendMessage", {
        ...newMsg,
        senderId: user?.userData?._id,
        receiverId: selectedChat?._id,
      });

      // Add immediately for sender
      setAllMessages((prev) => [...prev, newMsg]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  // 🟣 If no chat selected
  if (!selectedChat)
    return (
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-lg text-center font-bold text-indigo-600 mb-2">
          Select A Person To Chat with!!!
        </h2>
      </div>
    );

  // 🟣 Chat window
  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">

        <button
          onClick={() => navigate("/Home")}
          className="text-indigo-600 cursor-pointer font-semibold hover:underline">
          ← Back
        </button>

        <h2 className="text-lg font-semibold text-indigo-700">
          {selectedChat?.username?.firstname} {selectedChat?.username?.lastname}
          {selectedChat?.email === user?.userData?.email && " (You)"}
        </h2>

        <div className="w-10" /> {/* spacer */}
      </div>

      {/* MESSAGES BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">

        {allMessages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No Messages Yet...</p>
        ) : (
          allMessages.map((message) => {
            const senderId =
              message.senderId?._id || message.senderId || message?.user?._id;
            const isSentByCurrentUser = senderId === user?.userData?._id;

            return (
              <div
                key={message._id}
                className={`flex ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                    isSentByCurrentUser
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}>
                  {message.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT SECTION */}
      <div className="p-4 bg-white border-t flex gap-3">
        <textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 resize-none p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  );

};

export default ChatContainer;