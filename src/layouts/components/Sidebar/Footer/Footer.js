import React from 'react'
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('link-container')}>
        <Link className={cx('link-item')}>About</Link>
        <Link className={cx('link-item')}>Newsroom</Link>
        <Link className={cx('link-item')}>Contact</Link>
        <Link className={cx('link-item')}>Careers</Link>
        <Link className={cx('link-item')}>ByteDance</Link>
      </div>
      <div className={cx('link-container')}>
        <Link className={cx('link-item')}>TikTok for Good</Link>
        <Link className={cx('link-item')}>Advertise</Link>
        <Link className={cx('link-item')}>Developers</Link>
        <Link className={cx('link-item')}>Transparency</Link>
        <Link className={cx('link-item')}>TikTok Rewards</Link>
        <Link className={cx('link-item')}>TikTok Embeds</Link>
      </div>
      <div className={cx('link-container')}>
        <Link className={cx('link-item')}>Help</Link>
        <Link className={cx('link-item')}>Safety</Link>
        <Link className={cx('link-item')}>Privacy</Link>
        <Link className={cx('link-item')}>Creator Portal</Link>
        <Link className={cx('link-item')}>Community Guidelines</Link>
      </div>
      <div className={cx('copy-right')}>© 2023 TikTok</div>
    </div>
  );
}

export default Footer