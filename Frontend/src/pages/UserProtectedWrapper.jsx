import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const UserProtectedWrapper = ({children}) => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.authenticated === false) {
      toast.error("Please Login to use this");
      navigate('/');
    }
  }, [user, navigate]);

  if(user === null)
    return <div>Loading...</div>

  return (
    <> {children} </>
  )
}

export default UserProtectedWrapper