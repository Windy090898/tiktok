import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import * as videoServices from '~/services/videoServices';
import { useElementOnBottom } from '~/hooks';
import HomeItem from './HomeItem';

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
        let ref = index === endPage ? lastVideoRef : undefined;
        return (
          <div className={cx('item-container')} key={video.id} ref={ref}>
            <HomeItem video={ video} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
