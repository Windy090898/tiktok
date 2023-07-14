import React from 'react'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <ul className={cx('sibar-list')}>
        <li className={cx('sidebar-item', 'active')}>
          <Link className={cx('sidebar-link')} to="/">For You</Link>
        </li>
        <li className={cx('sidebar-item')}>
          <Link className={cx('sidebar-link')}>Following</Link>
        </li>
        <li className={cx('sidebar-item', 'new')}>
          <Link className={cx('sidebar-link')}>
            Explore
            <span className={cx('new-icon')}>New</span>
          </Link>
        </li>
        <li className={cx('sidebar-item')}>
          <Link className={cx('sidebar-link')}>LIVE</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar