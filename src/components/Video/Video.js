import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { PauseIcon, PlayIcon, VolumeOffIcon, VolumeOnIcon } from '../Icon';
import { useElementOnScreen } from '~/hooks';
import images from '~/assets/img';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Video(
  {
    video,
    control = false,
    volume: initialVolume,
    loop = false,
    activeId,
    handleNextVideo,
  },
  ref,
) {
  const { file_url, thumb_url, id } = video;
  const videoRef = useRef();

  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(initialVolume);

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  };

  const visible = useElementOnScreen(options, videoRef);

  useEffect(() => {
    if (visible) {
      if (activeId) {
        if (id === activeId) {
          setPlaying(true);
        }
      } else {
        setPlaying(true);
      }
    } else {
      setPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, activeId]);

  const handlePlayControl = () => {
    setPlaying(!playing);
    if (!playing) {
      setVolume(50);
    }
  };

  const handleVolume = () => {
    setVolume((prev) => (prev === 0 ? 50 : 0));
  };

  const handleVolumeChange = (e) => {
    if (isNaN(e.target.value)) {
      setVolume(0);
    } else {
      setVolume(e.target.value);
    }
  };

  

  return (
    <>
      <div className={cx('video-container')}>
        <ReactPlayer
          url={file_url}
          playing={playing}
          volume={parseFloat(volume / 100) || 0}
          muted={volume === 0}
          loop={loop}
          className={cx('video')}
          ref={videoRef}
          poster={thumb_url || images.noImage}
          width={'100%'}
          height={'100%'}
          onEnded={handleNextVideo}
        ></ReactPlayer>
      </div>
      {control && (
        <div className={cx('control')}>
          <div className={cx('control-play')} onClick={handlePlayControl}>
            {!playing && <PlayIcon />}
            {playing && <PauseIcon />}
          </div>
          <div className={cx('control-volume')}>
            <div className={cx('volume-icon')} onClick={handleVolume}>
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
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default forwardRef(Video);
