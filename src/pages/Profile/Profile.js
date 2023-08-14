import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import { LockIcon, RegularLockIcon } from '~/components/Icon';
import * as videoServices from '~/services/videoServices';
import * as userServices from '~/services/userServices';
import ProfileHeader from './ProfileHeader';
import ProfileVideos from './ProfileVideos';
import { AuthContext } from '~/context/AuthProvider';

const cx = classNames.bind(styles);

const PROFILE_TABS = [
  {
    title: 'Videos',
  },
  {
    icon: <LockIcon />,
    title: 'Favorites',
  },
  {
    icon: <LockIcon />,
    title: 'Likes',
  },
];

function Profile() {
  const { nickname } = useParams();
  const {currentUser} = useContext(AuthContext)

  //User section
  const [user, setUser] = useState();

  // Tab section
  const [tabBottomWidth, setTabBottomWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Video Section
  const [userVideos, setUserVideos] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [likedIds, setLikedIds] = useState([]);


  const getUserVideo = async (id) => {
    let response = await videoServices.getUserVideo(id);
    setUserVideos(response);
    setUserIds(response.map((video) => video.id));
  };
  const getLikedVideo = async (id) => {
    let response = await videoServices.getLikedVideos(id);
    setLikedVideos(response);
    setLikedIds(response.map((video) => video.id));
  }

  useEffect(() => {
    const getUser = async () => {
      let response = await userServices.getUser(nickname);
      setUser(response);
      getUserVideo(response.id);
      getLikedVideo(response.id);
    };
    getUser();
    
  }, [nickname]);

  const tabRef = useRef();

  const handleBottomLine = (index) => {
    const tabItems = Array.from(tabRef.current.children);
    let translate = 0;
    for (let i = 0; i < index; i++) {
      translate += tabItems[i].offsetWidth;
    }
    setTranslateX(translate);
    setTabBottomWidth(tabItems[index].offsetWidth);
  };

  useEffect(() => {
    setActiveTab(0)
    handleBottomLine(0);
  }, [nickname]);

  const handleChangeTab = (index) => {
    handleBottomLine(index);
    setActiveTab(index);
  };

  return (
    <div className={cx('wrapper')}>
      {user && <ProfileHeader user={user} />}
      <section className={cx('main')}>
        <div
          className={cx('nav-tab')}
          ref={tabRef}
          onMouseLeave={() => handleBottomLine(activeTab)}
        >
          {PROFILE_TABS.map((item, index) => (
            <p
              // eslint-disable-next-line eqeqeq
              className={cx('tab-item', { active: activeTab == index })}
              key={index}
              onClick={() => handleChangeTab(index)}
              onMouseOver={() => handleBottomLine(index)}
            >
              {item.icon && item.icon}
              {item.title}
            </p>
          ))}
          <div
            className={cx('bottom-line')}
            style={{
              width: tabBottomWidth,
              transform: `translateX(${translateX}px)`,
            }}
          ></div>
        </div>
        {activeTab === 0 && (
          <ProfileVideos videoList={userVideos} idList={userIds} />
        )}
        {activeTab === 2 && (user.id === currentUser.id ? (
          <ProfileVideos videoList={likedVideos} idList={likedIds} />
        ) : (
          <div className={cx('lock-msg')}>
            <RegularLockIcon className={cx('lock-icon')}/>
            <h3 className={cx('title')}>This user's liked videos are private</h3>
            <p className={cx('sub-title')}>Videos liked by letuankhang2002 are currently hidden</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Profile;
