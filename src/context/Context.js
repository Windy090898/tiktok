import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext();

function Provider({ children }) {
  const [suggestAccs, setSuggestAccs] = useState([])
    useEffect(() => {
        axios
          .get(
            'https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=5',
          )
          .then((res) => setSuggestAccs(res.data.data));
    }, [])
  return (
    <Context.Provider value={{suggestAccs}}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
