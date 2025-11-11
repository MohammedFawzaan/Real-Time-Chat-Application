import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.authenticated === true)
      navigate('/');
  }, [user, navigate]);

  const handleClick = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }

  return (
    <div className='text-center p-5 mt-5'>
      <h1 className="text-2xl text-blue-600 font-bold">Welcome to Our Chat App</h1>
      <button className='mt-3 bg-blue-500 cursor-pointer active:bg-blue-600 text-white rounded-lg px-4 py-2' onClick={handleClick}>Login with Google</button>
      <p className='mt-3'>Made by Mohammed Fawzaan 💖</p>
    </div>
  )
}

export default Start