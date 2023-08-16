import React from 'react';
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
  VolumeOnIcon,
} from '~/components/Icon';
import { Link, useNavigate } from 'react-router-dom';
import Video from '~/components/Video/Video';
const cx = classNames.bind(styles);

function VideoContainer({ video }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
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
        <div className={cx('icon')}>
          <VolumeOnIcon />
        </div>
      </div>
      {video && (
        <div className={cx('video-wrapper')}>
          <Video video={video} />
          <button>
            <PlayIcon />
          </button>
          <div className={cx('player-control')}>
            <div className={cx('progess-bar-container')}>
              <div
                className={cx('progress-bar')}
                style={{ width: `${20}%` }}
              ></div>
              <input
                type="range"
                min={0}
                max={100}
                value={20}
                // onInput={handleChangePlayedTime}
              />
            </div>
            <div className={cx('progress-time')}>00:01/00:40</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoContainer;
