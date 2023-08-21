import React, { useContext, useEffect } from 'react';
import { AuthContext } from '~/context/AuthProvider';
import { UserContext } from '~/context/UserProvider';
import * as followServices from '~/services/followServices';
import { IS_LOGIN, storage } from '~/storage';
import Button from '../Button/Button';

function FollowButton({
  isFollow,
  setIsFollow,
  setFollowerCount,
  tippyRef,
  id,
  className,
}) {
  const { setShowModal } = useContext(AuthContext);
  const { followedList, setFollowedList } = useContext(UserContext);

  useEffect(() => {}, [id]);

  const handleLoginShow = () => {
    setShowModal(true);
    if (tippyRef.current) {
      tippyRef.current.hide();
    }
  };

  const handleFollow = (id) => {
    const followUser = async (id) => {
      let response = await followServices.follow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
      setFollowedList([...followedList, id]);
    };

    const unFollowUser = async (id) => {
      let response = await followServices.unFollow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    if (isFollow) {
      unFollowUser(id);
    } else {
      followUser(id);
    }
  };

  if (!storage.get(IS_LOGIN)) {
    return (
      <Button primary onClick={handleLoginShow} className={className}>
        Follow
      </Button>
    );
  } else if (!isFollow) {
    return (
      <Button primary onClick={() => handleFollow(id)} className={className}>
        Follow
      </Button>
    );
  } else {
    return (
      <Button outline onClick={() => handleFollow(id)} className={className}>
        Following
      </Button>
    );
  }
}

export default FollowButton;
