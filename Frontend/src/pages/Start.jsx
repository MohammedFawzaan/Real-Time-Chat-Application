import React from 'react'

const Start = () => {

  const handleSubmit = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  }

  return (
    <div>
        <h1>Welcome to our Chat App</h1>
        <button onClick={() => handleSubmit()}>Sign In with Google</button>
    </div>
  )
}

export default Start