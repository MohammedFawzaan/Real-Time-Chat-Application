import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/auth/check`,
              { withCredentials: true }
          );
          console.log(response.data);
          setUser({
              userData: response.data.userData,
              authenticated: response.data.authenticated
          });
        } catch (error) {
          console.log(error);
          setUser({ authenticated: false });
        }
    }
    checkAuth();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserContext, UserDataContext};