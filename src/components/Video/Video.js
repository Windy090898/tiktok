import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import video1 from '../../assets/video/Snaptik.app_7234721712384871685.mp4';

import { PauseIcon, PlayIcon, VolumeOffIcon, VolumeOnIcon } from '../Icon';
import VideoActions from './VideoActions';

const cx = classNames.bind(styles);

function Video({ control }) {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);

  const videoRef = useRef();

  useEffect(() => {
    let playPromise = videoRef.current.play();
    if (play) {
      videoRef.current.play();
    } else {
      // solve: DOMException - The play() request was interrupted by a call to pause().
      if (playPromise !== undefined) {
        playPromise
          .then(() => videoRef.current.pause())
          .catch((err) => console.log(err));
      }
    }
    videoRef.current.loop = true;
  }, [play]);

  useEffect(() => {
    if (volume === 0) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
      videoRef.current.volume = volume/100
    }
   }, [volume]);
  
  const handleMute = useCallback(() => {
    let newVolume = volume === 0 ? 50 : 0;
    setVolume(newVolume);
  }, [volume]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container')}>
        <video
          src={video1}
          className={cx('video')}
          ref={videoRef}
          // autoPlay
          muted={true}
        ></video>
        <div className={cx('control')}>
          <div className={cx('control-play')} onClick={() => setPlay(!play)}>
            {!play && <PlayIcon />}
            {play && <PauseIcon />}
          </div>
          <div className={cx('control-volume')}>
            <div className={cx('volume-icon')} onClick={handleMute}>
              {volume !== 0 && <VolumeOnIcon />}
              {volume === 0 && <VolumeOffIcon />}
            </div>
            <input
              type="range"
              className={cx('volume-change')}
              orient="vertical"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
        </div>
      </div>
      <VideoActions />
    </div>
  );
}

export default Video;
