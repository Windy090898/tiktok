import React from 'react';
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import UserProvider from '~/context/UserProvider';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {


  return (
    <UserProvider>
      <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
          <Sidebar />
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </UserProvider>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout;
