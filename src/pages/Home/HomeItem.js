import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Image from '~/components/Image';
import Video from '~/components/Video';
import AccPreview from '~/components/Popper/AccPreview';
import * as followServices from '~/services/followServices';
import { IS_LOGIN, storage } from '~/storage';
import { AuthContext } from '~/context/AuthProvider';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function HomeItem({ video }) {
  const { user, description, music } = video;
  const [isFollow, setIsFollow] = useState(user.is_followed);
  const [followerCount, setFollowerCount] = useState(user.followers_count);

  let isLogin = storage.get(IS_LOGIN);
  const { setShowModal } = useContext(AuthContext);
  const handleLoginShow = () => {
    setShowModal(true);
  };
  const handleFollow = (id) => {
    let response;
    const followUser = async () => {
      response = await followServices.follow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    const unFollowUser = async () => {
      response = await followServices.unFollow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    if (isFollow) {
      unFollowUser();
    } else {
      followUser();
    }
  };
  const renderButtonFollow = () => {
    if (!isLogin) {
      return (
        <Button primary onClick={handleLoginShow}>
          Follow
        </Button>
      );
    } else if (!isFollow) {
      return (
        <Button primary onClick={() => handleFollow(user.id)}>
          Follow
        </Button>
      );
    } else {
      return (
        <Button outline onClick={() => handleFollow(user.id)}>
          Following
        </Button>
      );
    }
  };
  return (
    <>
      <AccPreview
        item={user}
        onFollow={handleFollow}
        isFollow={isFollow}
        followerCount={followerCount}
        isLogin={isLogin}
      >
        <Link className={cx('avatar-container')}>
          <Image src="" alt="" className={cx('avatar')}></Image>
        </Link>
      </AccPreview>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('infor')}>
            <AccPreview
              item={user}
              onFollow={handleFollow}
              isFollow={isFollow}
              followerCount={followerCount}
              isLogin={isLogin}
            >
              <Link className={cx('author')}>
                <div className={cx('nickname')}>
                  {user.nickname}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={cx('check')}
                  />
                </div>
                <div
                  className={cx('name')}
                >{`${user.first_name} ${user.last_name}`}</div>
              </Link>
            </AccPreview>
            <div className={cx('caption')}>
              {description}
              {/* <strong className={cx('hastag')}>#fyp</strong> */}
            </div>
            <Link className={cx('music')}>
              <MusicIcon />
              <div className={cx('music-name')}>
                {music === '' ? 'Music is playing...' : music}
              </div>
            </Link>
          </div>
          {renderButtonFollow()}
        </div>
        <Video video={video} />
      </div>
    </>
  );
}

export default HomeItem;
