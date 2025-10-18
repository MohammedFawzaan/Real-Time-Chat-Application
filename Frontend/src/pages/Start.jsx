import React from 'react'

const Start = () => {

  const handleClick = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/users/auth/google`, "_self");
  }

  return (
    <div>
        <h1>Welcome to Our Chat App</h1>
        <button onClick={handleClick} >Login with Google</button>
    </div>
  )
}

export default Start