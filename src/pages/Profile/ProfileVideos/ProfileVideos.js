import React, { useCallback, useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';
import { Link } from 'react-router-dom';
import Video from '~/components/Video/Video';
import { PlayIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function ProfileVideos({ videoList, idList }) {
    const [activeIndex, setActiveIndex] = useState(0);
    
  const handleNextVideo = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev + 1 >= idList.length) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }, [idList]);
    
  return (
    <div className={cx('videos-list-container')}>
      {videoList.map((video, index) => (
        <Link className={cx('video-item')} key={index}>
          <div className={cx('video-preview')}>
            <div className={cx('video-wrapper')}>
              <Video
                video={video}
                playing={activeIndex === index}
                volume={0}
                activeId={idList[activeIndex]}
                handleNextVideo={handleNextVideo}
              ></Video>
              <div className={cx('video-bottom')}>
                <PlayIcon width="1.8rem" height="1.8rem" />
                <span className={cx('view-count')}>{video.views_count}</span>
              </div>
            </div>
          </div>
          <div className={cx('title')}>{video.description}</div>
        </Link>
      ))}
    </div>
  );
}

export default ProfileVideos;
