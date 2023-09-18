import React, { memo, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './VideoList.module.scss';

import * as videoServices from '~/services/videoServices';
import { useElementOnBottom } from '~/hooks';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

function VideoList({ videoType }) {
  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(null);
  const [endIndex, setEndIndex] = useState();
  const [totalPage, setTotalPage] = useState(null);

  // get a random page to call API, 1 time only when page load
  useEffect(() => {
    const setRandomPage = async () => {
      let response = await videoServices.videoList(videoType, 1);

      if (response) {
        let { total_pages } = response?.meta?.pagination;
        setTotalPage(total_pages);
        setPage(Math.floor(Math.random() * total_pages));
      }
    };
    setRandomPage();
  }, []);

  // setVideoList to render when have page
  useEffect(() => {
    const getVideoList = async () => {
      let response = await videoServices.videoList(videoType, page);
      const newList = [...videoList, ...response.data];
      setVideoList(newList);
      setEndIndex(newList.length - 1);
    };
    if (page) {
      getVideoList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const lastVideoRef = useRef();
  const options = {
    threshold: 0.6,
  };
  let isBottom = useElementOnBottom(lastVideoRef, options);

  // Update page number when scroll to bottom
  useEffect(() => {
    if (isBottom) {
      setPage((prev) => {
        const nextPage = prev + 1;
        if (nextPage > totalPage) {
          return 1;
        }
        return nextPage;
      });
    }
  }, [isBottom]);

  if (videoList.length > 0) {
    return (
      <div className={cx('wrapper')}>
        {videoList.map((video, index) => {
          let ref = index === endIndex ? lastVideoRef : undefined;
          return (
            <div className={cx('item-container')} key={video.id} ref={ref}>
              <VideoItem
                video={video}
                videoList={videoList}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={cx('loader-container')}>
        <div className={cx('loader')}>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
          <div className={cx('dot')}></div>
        </div>
      </div>
    );
  }
}

export default memo(VideoList);
