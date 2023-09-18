import React, { useContext, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import Button from '~/components/Button';
import { EditIcon, LightShareIcon } from '~/components/Icon';
import Image from '~/components/Image';
import EditProfileModal from './EditProfileModal';
import FollowButton from '~/components/FollowButton/FollowButton';
import { UserContext } from '~/context/UserProvider';

const cx = classNames.bind(styles);

function ProfileHeader({ user, isCurrentUser, setUser }) {
  const {
    id,
    nickname,
    avatar,
    first_name,
    followings_count,
    followers_count,
    likes_count,
    bio,
  } = user;

  const [showModal, setShowModal] = useState(false);
  const { followedList } = useContext(UserContext);
  const [isFollow, setIsFollow] = useState(followedList.includes(id));
  const [followerCount, setFollowerCount] = useState(followers_count);

  return (
    <>
      <section className={cx('header')}>
        <div className={cx('infor')}>
          <div className={cx('avatar')}>
            <Image src={avatar} alt="profile-img"></Image>
          </div>
          <div className={cx('title-container')}>
            <h3 className={cx('nickname')}>{nickname}</h3>
            <p className={cx('fullname')}>{first_name}</p>
            {isCurrentUser ? (
              <Button
                className={cx('profile-btn')}
                onClick={() => setShowModal(true)}
              >
                <EditIcon />
                <span className={cx('edit-title')}>Edit Profile</span>
              </Button>
            ) : (
              <FollowButton
                className={cx('profile-btn')}
                isFollow={isFollow}
                setIsFollow={setIsFollow}
                setFollowerCount={setFollowerCount}
                tippyRef
                id={id}
              />
            )}
          </div>
        </div>
        <div className={cx('share')}>
          <LightShareIcon />
        </div>
        <div className={cx('countInfor')}>
          <div className={cx('countInfor-item')}>
            <span className={cx('number')}>{followings_count || 0}</span>
            <span className={cx('title')}>Following</span>
          </div>
          <div className={cx('countInfor-item')}>
            <span className={cx('number')}>{followerCount || 0}</span>
            <span className={cx('title')}>Followers</span>
          </div>
          <div className={cx('countInfor-item')}>
            <span className={cx('number')}>{likes_count}</span>
            <span className={cx('title')}>Likes</span>
          </div>
        </div>
        <div className={cx('bio')}>{bio || 'No bio yet.'}</div>
      </section>
      <EditProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        setUser={setUser}
      />
    </>
  );
}

export default ProfileHeader;
