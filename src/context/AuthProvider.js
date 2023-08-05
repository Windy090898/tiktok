import { createContext, useEffect, useState } from 'react';
import * as authServices from '~/services/authServices'

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [showModal, setShowModal] = useState(false)
  const [auth, setAuth] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const getCurrentUser = async () => {
      let response = await authServices.getCurrentUser()
      setCurrentUser(response)
    }
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider value={{ showModal, setShowModal, auth, setAuth, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
