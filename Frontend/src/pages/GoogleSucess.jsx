import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GoogleSucess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if(token) {
        localStorage.setItem('token', token);
        navigate('/Home');
    }
  }, []);

  return (
    <div>GoogleSucess</div>
  )
}

export default GoogleSucess