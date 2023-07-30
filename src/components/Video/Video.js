import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { PauseIcon, PlayIcon, VolumeOffIcon, VolumeOnIcon } from '../Icon';
import { useElementOnScreen } from '~/hooks';
import images from '~/assets/img'

const cx = classNames.bind(styles);

function Video({ video, fallback: customFallback = images.noVideo }) {
  const [fallback, setFallback] = useState('')
  const handleFallback = () => {
    setFallback(customFallback)
  }
  
  const { file_url, thumb_url } = video;
  const videoRef = useRef();

  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  };

  const visible = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (visible) {
      if (!play) {
        let playPromise = videoRef.current.play();
        playPromise
          .then(() => {
            setPlay(true);
            setVolume(50);
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (play) {
        videoRef.current.pause();
        setPlay(false);
      }
    }
    videoRef.current.loop = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (volume === 0) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handlePlayControl = () => {
    if (!play) {
      let playPromise = videoRef.current.play();
      setVolume(50);

      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlay(!play))
          .catch((err) => {
            console.log(err);
            videoRef.current.pause();
            setPlay(false);
          });
      }
    } else {
      videoRef.current.pause();
      setPlay(!play);
    }
  };

  const handleMute = () => {
    let newVolume = volume === 0 ? 50 : 0;
    setVolume(newVolume);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container')}>
        <div className={cx('video')} onClick={handlePlayControl}>
          <video
            onError={handleFallback}
            src={file_url || fallback}
            className={cx('video')}
            ref={videoRef}
            poster={thumb_url || images.noImage}
          ></video>
        </div>
        <div className={cx('control')}>
          <div className={cx('control-play')} onClick={handlePlayControl}>
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
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
}

export default Video;
