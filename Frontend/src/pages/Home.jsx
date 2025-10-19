import React, { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import ChatContainer from '../components/ChatContainer'
import SideBar from '../components/SideBar'

const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserDataContext);
  const firstname = user?.userData?.username?.firstname + " " + user?.userData?.username?.lastname;

  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/auth/logout`, {
        withCredentials: true
      });
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Logout Failed');
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-1.5 bg-gray-100">
      <div className="flex justify-between items-center p-3 mb-4">
        <h1 className="text-2xl font-bold">Hi!!! {firstname}</h1>
        <button
          onClick={logout}
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-lg px-4 py-2">
          Logout
        </button>
      </div>
      <div className="flex flex-1 w-full bg-white shadow-md overflow-hidden">
        <SideBar />
        <ChatContainer />
      </div>
    </div>
  )
}

export default Home