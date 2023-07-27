import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [showModal, setShowModal] = useState(false)
  const [auth, setAuth] = useState({})

  return (
    <AuthContext.Provider value={{ showModal, setShowModal, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
