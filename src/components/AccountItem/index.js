import React from 'react'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function AccountItem({ item, onClick }) {
  const { avatar, full_name, nickname, tick } = item;
    return (
      <Link className={cx('wrapper')} to={`/${nickname}`} onClick={onClick}>
        <Image className={cx('avatar')} src={avatar} alt="" />
        <div className={cx('info')}>
          <p className={cx('name')}>
            {full_name}
            {tick && <i className="fa-solid fa-circle-check"></i>}
          </p>

          <span className={cx('username')}>{nickname}</span>
        </div>
      </Link>
    );
}

export default AccountItem