import { memo, useContext, useEffect, useRef, useState } from 'react';
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
  const { currentUser } = useContext(AuthContext);

  //User section
  const [user, setUser] = useState();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // Tab section
  const [tabBottomWidth, setTabBottomWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Video Section
  const [videoList, setVideoList] = useState([]);

  const tabRef = useRef();

  useEffect(() => {
    setActiveTab(0);
    handleBottomLine(0);

    const fetchUsernVideos = async () => {
      let response = await userServices.getUser(nickname);
      setUser(response);
      getUserVideo(response.id, 0);
      setIsCurrentUser(response.id === currentUser.id);
    };
    if (nickname) {
      fetchUsernVideos();
    }
  }, [nickname]);

  useEffect(() => {
    const fetchVideos = async () => {
      getUserVideo(user.id, activeTab);
    };
    if (user) {
      fetchVideos();
    }
  }, [activeTab]);

  const getUserVideo = async (id, activeTab) => {
    let page = 1;
    let newVideoList = [];
    let response = [];
    do {
      if (activeTab === 2 && isCurrentUser) {
        response = await videoServices.getLikedVideos(id, page);
      } else if (activeTab === 0) {
        response = await videoServices.getUserVideo(id, page);
      }
      newVideoList = [...newVideoList, ...response];
      page++;
    } while (response.length > 0);
    setVideoList(newVideoList);
  };

  const handleBottomLine = (index) => {
    let tabItems = Array.from(tabRef.current.children);
    let translate = 0;
    for (let i = 0; i < index; i++) {
      translate += tabItems[i].offsetWidth;
    }
    setTranslateX(translate);
    setTabBottomWidth(tabItems[index].offsetWidth);
  };

  const handleChangeTab = (index) => {
    handleBottomLine(index);
    setActiveTab(index);
  };

  return (
    <div className={cx('wrapper')}>
      {user && currentUser && (
        <ProfileHeader
          user={user}
          isCurrentUser={isCurrentUser}
          setUser={setUser}
        />
      )}
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
        {(currentUser && user && isCurrentUser) || videoList.length > 0 ? (
          <ProfileVideos videoList={videoList} />
        ) : (
          <div className={cx('lock-msg')}>
            <RegularLockIcon className={cx('lock-icon')} />
            <h3 className={cx('title')}>
              This user's {activeTab === 1 ? 'favored' : 'liked'} videos are
              private
            </h3>
            <p className={cx('sub-title')}>
              Videos {activeTab === 1 ? 'favored' : 'liked'} by
              {user && `${user.nickname}`} are currently hidden
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default memo(Profile);
