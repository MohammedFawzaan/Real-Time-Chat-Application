import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [chats, setChats] = useState([]);

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
    };
    getAllChats();
  }, []);

  const handleClick = (chat) => {
    navigate("/Chat", { state: { chat } });
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/auth/logout`, {}, { withCredentials: true });
      toast.success(response.data.message);
      setUser({ authenticated: false });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Logout Failed');
    }
  };

  if (!user || !user.userData?.username) {
    return <div className="text-xl text-center mt-10">Loading, please wait...</div>
  }

  const name = `${user.userData.username.firstname} ${user.userData.username.lastname}`;

  return (
    <div className="flex items-center justify-center px-3">
      <div className="w-full max-w-md flex flex-col h-[100vh] p-5">

        {/* Header */}
        <h1 className="text-xl text-center font-bold truncate mt-5">Hi! {name}</h1>
        <p className="text-xs text-center text-gray-500 mb-5">{user?.userData?.email}</p>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat) => {
            if(chat._id === user.userData._id)
              return;
            return <div
              key={chat._id}
              onClick={() => handleClick(chat)}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition text-center">
              <p className="font-medium text-gray-900">
                  {chat?.username?.firstname} {chat?.username?.lastname}
              </p>
              <p className="text-xs text-gray-500">{chat?.email}</p>
            </div>
          })}
        </div>
        <button
            onClick={logout}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg p-3">
            Logout
        </button>
      </div>
    </div>
  );
}

export default Home;