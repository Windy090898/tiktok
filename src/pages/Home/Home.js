import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Image from '~/components/Image';
import Video from '~/components/Video';
import AccPreview from '~/components/Popper/AccPreview';
import * as videoServices from '~/services/videoServices';
import { useElementOnBottom } from '~/hooks';
import VideoHeader from './VideoHeader';

const cx = classNames.bind(styles);

function Home() {
  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(Math.floor(Math.random() * 32));
  const [endPage, setEndPage] = useState();

  useEffect(() => {
    const getVideoList = async () => {
      let response = await videoServices.videoList('for-you', page);
      const newList = [...videoList, ...response.data];
      setVideoList(newList);
      setEndPage(newList.length - 1);
    };
    getVideoList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const lastVideoRef = useRef();
  const options = {
    threshold: 0.6,
  };
  let isBottom = useElementOnBottom(lastVideoRef, options);

  useEffect(() => {
    if (isBottom) {
      setPage((prev) => prev + 1);
    }
  }, [isBottom]);

  return (
    <div className={cx('wrapper')}>
      {videoList.map((video, index) => {
        const { id, user} = video;
        let ref = index === endPage ? lastVideoRef : undefined;
        return (
          <div className={cx('item-container')} key={id} ref={ref}>
            <AccPreview item={user}>
              <Link className={cx('avatar-container')}>
                <Image src="" alt="" className={cx('avatar')}></Image>
              </Link>
            </AccPreview>
            <div className={cx('content')}>
              <VideoHeader video={video} />
              <Video video={video} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
