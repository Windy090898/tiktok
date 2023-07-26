import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Video from '~/components/Video';
import { MusicIcon } from '~/components/Icon';
import AccPreview from '~/components/Popper/AccPreview';
// import HomeItem from './HomeItem';
import * as services from '~/services/services';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { createRef } from 'react';
// import { VideoContext } from '~/context/VideoProvider';
const cx = classNames.bind(styles);

function Home() {
  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(Math.floor(Math.random() * 32));

  let type = 'for-you';
  useEffect(() => {
    const getVideoList = async () => {
      let response = await services.videoList(type, page);
      setVideoList(response);
    };
    getVideoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('wrapper')}>
      {videoList.map((video) => {
        const { id, user, description, music } = video;
        return (
          <div className={cx('item-container')} key={id}>
            <AccPreview item={user}>
              <Link className={cx('avatar-container')}>
                <Image src="" alt="" className={cx('avatar')}></Image>
              </Link>
            </AccPreview>
            <div className={cx('content')}>
              <div className={cx('header')}>
                <div className={cx('infor')}>
                  <AccPreview item={user}>
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
                <Button outline>Follow</Button>
              </div>
              <Video video={video}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
