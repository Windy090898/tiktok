import React from 'react';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

import classNames from 'classnames/bind';
import styles from './HeaderOnlyLayout.module.scss';

const cx = classNames.bind(styles);

function HeaderOnlyLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default HeaderOnlyLayout;
