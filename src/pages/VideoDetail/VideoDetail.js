import React from 'react';
import classNames from 'classnames/bind';
import styles from './VideoDetail.module.scss';
import VideoContainer from './VideoContainer/VideoContainer';
import ContentContainer from './ContentContainer/ContentContainer';
import VideoDetailProvider from '~/context/VideoDetailProvider';

const cx = classNames.bind(styles);

function VideoDetail() {
    return (
      <VideoDetailProvider>
        <div className={cx('wrapper')}>
          <VideoContainer />
          <ContentContainer/>
        </div>
      </VideoDetailProvider>
    );
  
}

export default VideoDetail;
