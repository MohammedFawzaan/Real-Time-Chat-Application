import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/Home');
  }, []);

  return (
    <div>GoogleSuccess</div>
  )
}

export default GoogleSuccess