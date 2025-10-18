import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const addToDatabase = async () => {
    const response = await axios.post('http://localhost:4000/api/addName', { name: name });
    console.log(response.data);
    toast.success(response.data.message);
    setName("");
  }

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
    <div>
      <h1 className='text-3xl font-bold underline'>Home</h1>
      <h3>Name to add into Database</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addToDatabase}>Add</button>
      <p>{name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home