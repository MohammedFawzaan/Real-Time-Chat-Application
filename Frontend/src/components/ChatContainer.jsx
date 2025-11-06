import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { UserDataContext } from "../context/UserContext";

// ✅ Initialize socket globally (single instance)
const socket = io(import.meta.env.VITE_BASE_URL, { withCredentials: true });

const ChatContainer = ({ selectedChat }) => {
  const { user } = useContext(UserDataContext);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

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
    <div className="flex-1 flex flex-col p-4">
      {selectedChat?.email === user?.userData?.email ? (
        <h2 className="text-lg font-semibold text-indigo-600 mb-2">
          {selectedChat?.username?.firstname +
            " " +
            selectedChat?.username?.lastname}{" "}
          (You)
        </h2>
      ) : (
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">
          {selectedChat?.username?.firstname +
            " " +
            selectedChat?.username?.lastname}
        </h3>
      )}

      {/* 🟢 Messages Section */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
        {allMessages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No Messages Yet...</p>
        ) : (
          allMessages.map((message) => {
            // ✅ Handle both DB-populated and socket messages
            const senderId =
              message.senderId?._id || message.senderId || message?.user?._id;
            const receiverId =
              message.receiverId?._id || message.receiverId || message?.to?._id;

            const isSentByCurrentUser =
              senderId === user?.userData?._id ||
              message.sender?.email === user?.userData?.email;

            return (
              <div
                key={message._id || `${senderId}-${Math.random()}`}
                className={`flex mb-2 ${
                  isSentByCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[70%] p-3 text-sm break-words ${
                    isSentByCurrentUser
                      ? "bg-blue-500 text-white rounded-l-xl rounded-tr-xl"
                      : "bg-gray-200 text-gray-800 rounded-r-xl rounded-tl-xl"
                  }`}
                >
                  {message?.text}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* 🟢 Input Section */}
      <div className="mt-3 flex items-center gap-2">
        <textarea
          placeholder="Type a message..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;