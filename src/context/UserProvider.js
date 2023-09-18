import React, { createContext, useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import * as followServices from '~/services/followServices';
import { IS_LOGIN, storage } from '~/storage';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [suggestAccs, setSuggestAccs] = useState([]);
  const [followedList, setFollowedList] = useState([]);
  const isLogin = storage.get(IS_LOGIN);

  // Get API để lấy current Followings account của user => update vào followedList để loại trừ trong suggestAccs
  // Chỉ chạy lần đầu tiên, những lần sau khi ấn follow thì xử lí setFollowedList sau
  useEffect(() => {
    const getFollowList = async () => {
      let response = await followServices.getFollowList(1);
      if (!response.error) {
        let totalPage = response.meta.pagination.total_pages;
        const followIds = [];
        for (let i = 1; i <= totalPage; i++) {
          let response = await followServices.getFollowList(i);
          followIds.push(...response.data.map((item) => item.id));
        }
        setFollowedList([...followedList, ...followIds]);
      }
    };
    if (isLogin) {
      getFollowList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get suggested accs from API => suggestAccs will have value and transfer to render UI
  // if followedList length change => re get API to have new list
  useEffect(() => {
    const getSuggestAccs = async () => {
      let response = await userServices.suggestAccs(1, 5, followedList.join(','));
      setSuggestAccs(response);
    };
    getSuggestAccs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followedList.length]);

  return (
    <UserContext.Provider
      value={{ suggestAccs, followedList, setFollowedList }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
