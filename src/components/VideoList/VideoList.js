import React, { memo, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './VideoList.module.scss';

import * as videoServices from '~/services/videoServices';
import { useElementOnBottom } from '~/hooks';
import VideoItem from './VideoItem';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function VideoList() {
  const location = useLocation();
  const pathName = location.pathname.slice(1);

  const videoType = pathName ? pathName : 'for-you';

  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(null);
  const [endPage, setEndPage] = useState();
  const [totalPage, setTotalPage] = useState(null);

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

  useEffect(() => {
    const getVideoList = async () => {
      let response = await videoServices.videoList(videoType, page);
      const newList = [...videoList, ...response.data];
      setVideoList(newList);
      setEndPage(newList.length - 1);
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
          let ref = index === endPage ? lastVideoRef : undefined;
          return (
            <div className={cx('item-container')} key={video.id} ref={ref}>
              <VideoItem video={video} videoType={videoType} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={cx('loader-container')}>
        <div className={cx('loader')}>
          <div className={cx("dot")}></div>
          <div className={cx("dot")}></div>
          <div className={cx("dot")}></div>
          <div className={cx("dot")}></div>
          <div className={cx("dot")}></div>
        </div>
        
      </div>
    );
  }
}

export default memo(VideoList);
