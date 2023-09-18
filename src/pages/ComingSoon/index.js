import React from 'react'
import classNames from 'classnames/bind'
import styles from './ComingSoon.module.scss'

const cx = classNames.bind(styles)

function ComingSoon() {
    return (
      <div className={cx('container')}>
        <div className={cx('letter-image')}>
          <div className={cx('animated-mail')}>
            <div className={cx('back-fold')}></div>
            <div className={cx('letter')}>
              <div className={cx('letter-border')}></div>
              <div className={cx('letter-title')}></div>
              <div className={cx('letter-context')}></div>
              <div className={cx('letter-content')}>Coming Soon !!!</div>
              {/* <div className={cx('letter-stamp')}> */}
                {/* <div className={cx('letter-stamp-inner')}></div>
              </div> */}
            </div>
            <div className={cx('top-fold')}></div>
            <div className={cx('body')}></div>
            <div className={cx('left-fold')}></div>
          </div>
          <div className={cx('shadow')}></div>
        </div>
      </div>
    );
}

export default ComingSoon