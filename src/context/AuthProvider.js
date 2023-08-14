import { createContext, useCallback, useEffect, useState } from 'react';
import * as authServices from '~/services/authServices';
import { IS_LOGIN, storage } from '~/storage';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  // const [auth, setAuth] = useState({})
  const [currentUser, setCurrentUser] = useState({});
  const isLogin = storage.get(IS_LOGIN);

  useEffect(() => {
    const getCurrentUser = async () => {
      let response = await authServices.getCurrentUser();
      setCurrentUser(response);
    };
    if (isLogin) {
      getCurrentUser();
    }
  }, [isLogin]);


  return (
    <AuthContext.Provider
      value={{
        showModal,
        setShowModal,
        // auth,
        // setAuth,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
