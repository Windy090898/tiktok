import React, { forwardRef, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { PauseIcon, PlayIcon } from '../Icon';
import { useElementOnScreen } from '~/hooks';
import images from '~/assets/img';
import Volume from '~/components/Volume';

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
  const { username } = useParams();

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

  const navigate = useNavigate();
  const navigateToVidDetail = () => {
    navigate(`/@${video.user.nickname}/video/${video.uuid}`);;
  };

  return (
    <>
      <div className={cx('video-container')} onClick={navigateToVidDetail}>
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
          <Volume volume={volume} setVolume={setVolume} />
        </div>
      )}
    </>
  );
}

export default forwardRef(Video);
