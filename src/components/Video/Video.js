import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { PauseIcon, PlayIcon, VolumeOffIcon, VolumeOnIcon } from '../Icon';
import VideoActions from './VideoActions';
import { useElementOnScreen } from '~/hooks';

const cx = classNames.bind(styles);

function Video({ video }) {
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
        playPromise.then(() => {
          setPlay(true);
        })
        .catch(err => console.log(err))
      }
    } else {
      if (play) {
        videoRef.current.pause();
        setPlay(false);
      }
    }
    videoRef.current.loop = true;
  }, [visible]);

  useEffect(() => {
    if (volume === 0) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handlePlay = () => {
    if (!play) {
      let playPromise = videoRef.current.play();
      setVolume(50)
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
    // if (playPromise !== undefined) {
    //   playPromise
    //     .then(() => {
    //       if (play){
    //         videoRef.current.pause()
    //       }

    //     })
    //     .catch(() => {

    //       console.log('errr');
    //     });
    // }
  };

  const handleMute = useCallback(() => {
    let newVolume = volume === 0 ? 50 : 0;
    setVolume(newVolume);
  }, [volume]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container')}>
        <div className={cx('video')} onClick={handlePlay}>
          <video
            src={file_url}
            className={cx('video')}
            ref={videoRef}
            // preload="auto"
            // allow="autoplay"
            poster={thumb_url}
          ></video>
        </div>
        <div className={cx('control')}>
          <div className={cx('control-play')} onClick={handlePlay}>
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

      <VideoActions video={video} />
    </div>
  );
}

export default Video;
