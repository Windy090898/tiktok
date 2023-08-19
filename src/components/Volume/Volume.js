import React from 'react';

import classNames from 'classnames/bind';
import styles from './Volume.module.scss';
import { VolumeOffIcon, VolumeOnIcon } from '../Icon';

const cx = classNames.bind(styles);
function Volume({ volume, setVolume, className }) {
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
    <div className={cx('control-volume', { [className]: className })}>
      <div className={cx('volume-icon')} onClick={handleVolume}>
        {volume === 0 ? <VolumeOffIcon /> : <VolumeOnIcon />}
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
  );
}

export default Volume;
