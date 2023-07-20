import React, { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import {
  CommentIcon,
  HeartIcon,
  SaveIcon,
  ShareIcon,
} from '../Icon';
import Button from '../Button';


const cx = classNames.bind(styles);


function VideoActions() {
  const [active, setActive] = useState(false)
  return (
    <ul className={cx('actions')}>
      <li className={cx('action-item')}>
        <Button
          circle
          className={cx('icon')}
          onClick={() => setActive(!active)}
        >
          <HeartIcon className={cx('heart-icon', { active })} />
        </Button>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <Button circle to="/comment" className={cx('icon')}>
          <CommentIcon />
        </Button>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <Button
          circle
          className={cx('icon')}
          onClick={() => setActive(!active)}
        >
          <SaveIcon className={cx('save-icon', { active })} />
        </Button>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <Button circle className={cx('icon')}>
          <ShareIcon />
        </Button>
        <div className={cx('label')}>1.2M</div>
      </li>
    </ul>
  );
}

export default VideoActions