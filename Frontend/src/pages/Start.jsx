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
    <div>
        <h1>Welcome to Our Chat App</h1>
        <button className='border-black text-white bg-blue-400 active:bg-blue-500 rounded-xl p-2 cursor-pointer' onClick={handleClick} >Login with Google</button>
    </div>
  )
}

export default Start