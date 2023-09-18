import React, { memo } from 'react'

import classNames from 'classnames/bind';
import styles from './VideoProgress.module.scss'

const cx = classNames.bind(styles)

function VideoProgress({
  playedPct,
  handleChangePlayedTime,
  playedSeconds,
  totalSeconds,
}) {
  const handleConvertTime = (inputSeconds) => {
    let minutes = ((inputSeconds % 3600) / 60).toFixed() || 0;
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    let seconds = (inputSeconds % 60).toFixed() || 0;
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    return { minutes, seconds };
    };
    
    const newPlayedSeconds = handleConvertTime(playedSeconds)
    const newTotalSeconds = handleConvertTime(totalSeconds)

  return (
    <div className={cx('player-control')}>
      <div className={cx('progess-bar-container')}>
        <div
          className={cx('progress-bar')}
          style={{ width: `${playedPct}%` }}
        ></div>
        <input
          type="range"
          min={0}
          max={100}
          value={20}
          onInput={handleChangePlayedTime}
        />
      </div>
        <div className={cx('progress-time')}>
          {`${newPlayedSeconds.minutes}:${newPlayedSeconds.seconds}`}
          <span>/</span>
          {`${newTotalSeconds.minutes}:${newTotalSeconds.seconds}`}
        </div>
    </div>
  );
}

export default VideoProgress