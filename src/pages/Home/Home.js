import React from 'react'
import HomeItem from './HomeItem'

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);


function Home() {
  return (
    <div className={cx('wrapper')}>
      <HomeItem />
      <HomeItem />
      <HomeItem />
    </div>
  );
}

export default Home