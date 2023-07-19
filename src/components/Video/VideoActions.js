import React from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { CommentIcon, HeartIcon, SaveIcon, ShareIcon } from '../Icon';

const cx = classNames.bind(styles);

function VideoActions() {
  return (
    <ul className={cx('actions')}>
      <li className={cx('action-item')}>
        <div className={cx('icon')}>
          <HeartIcon />
        </div>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <div className={cx('icon')}>
          <CommentIcon />
        </div>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <div className={cx('icon')}>
          <SaveIcon />
        </div>
        <div className={cx('label')}>1.2M</div>
      </li>
      <li className={cx('action-item')}>
        <div className={cx('icon')}>
          <ShareIcon />
        </div>
        <div className={cx('label')}>1.2M</div>
      </li>
    </ul>
  );
}

export default VideoActions;
