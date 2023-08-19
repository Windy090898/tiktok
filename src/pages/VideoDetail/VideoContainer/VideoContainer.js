import React, { useCallback, useContext, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './VideoContainer.module.scss';
import {
  ArrowIcon,
  CloseIcon,
  FlagIcon,
  HeartBreakIcon,
  MoreIcon,
  PlayIcon,
} from '~/components/Icon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Volume from '~/components/Volume/Volume';
import VideoProgress from '~/components/VideoProgress/VideoProgress';
import { browserHistory } from 'react-router-dom';
import { VideoDetailContext } from '~/context/VideoDetailProvider';
const cx = classNames.bind(styles);

function VideoContainer() {
  const {video} = useContext(VideoDetailContext)
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  };

  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [playedPct, setPlayPct] = useState(0);
  const [playedSeconds, setPlayingSeconds] = useState({});
  const [totalSeconds, setTotalSeconds] = useState({});

  const handleControlVideo = () => {
    setPlaying(!playing);
  };

  const handlePlayerProgress = useCallback((state) => {
    setPlayPct(state.played * 100);
    let playedSeconds = state.playedSeconds.toFixed();
    let loadedSeconds = state.loadedSeconds.toFixed();
    setPlayingSeconds(playedSeconds);
    setTotalSeconds(loadedSeconds);
  }, []);

  const videoRef = useRef();

  const handleChangePlayedTime = useCallback(
    (e) => {
      setPlayPct(e.target.value);
      videoRef.current.seekTo(playedPct / 100, 'fraction');
      let playedSeconds = videoRef.current.getCurrentTime();
      setPlayingSeconds(playedSeconds);
    },
    [playedPct],
  );
  return (
    <section className={cx('video-container')}>
      <div className={cx('blur-background')}></div>
      <div className={cx('close-icon', 'icon')} onClick={handleGoBack}>
        <CloseIcon width="2.4rem" height="2.4rem" />
      </div>
      <div className={cx('right-side-icon')}>
        <HeadlessTippy
          // visible
          interactive
          render={(attrs) => (
            <div tabIndex="-1" {...attrs} className={cx('more-wrapper')}>
              <Link className={cx('tippy-link-item', 'more-item')}>
                <HeartBreakIcon />
                <span>Not interested</span>
              </Link>
              <Link className={cx('tippy-link-item', 'more-item')}>
                <FlagIcon />
                <span>Report</span>
              </Link>
            </div>
          )}
        >
          <div className={cx('more-icon', 'icon')}>
            <MoreIcon width="2.4rem" height="2.4rem" />
          </div>
        </HeadlessTippy>
        <div className={cx('page-nav-button')}>
          <div className={cx('icon', 'up-icon')}>
            <ArrowIcon />
          </div>
          <div className={cx('icon', 'down-icon')}>
            <ArrowIcon />
          </div>
        </div>
        <Volume volume={volume} setVolume={setVolume} className={cx('icon')} />
      </div>
      {video && (
        <div className={cx('video-wrapper')} onClick={handleControlVideo}>
          <ReactPlayer
            url={video.file_url}
            playing={playing}
            volume={parseFloat(volume / 100) || 0}
            muted={volume === 0}
            loop
            width={'100%'}
            height={'100%'}
            onProgress={handlePlayerProgress}
            ref={videoRef}
          />
          {!playing && (
            <button className={cx('play-icon')}>
              <PlayIcon width="6.5rem" height="6.5rem" />
            </button>
          )}
          {playedSeconds && (
            <VideoProgress
              playedPct={playedPct}
              handleChangePlayedTime={handleChangePlayedTime}
              playedSeconds={playedSeconds}
              totalSeconds={totalSeconds}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default VideoContainer;
