import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SuggestAccs.module.scss';

import Image from '../Image';
import AccPreview from '~/components/Popper/AccPreview';

const cx = classNames.bind(styles);

function AccountItem({ item, preview }) {
  const {avatar, nickname, tick, first_name, last_name} = item
  const renderItem = () => {
    return (
      <div className={cx('account-item')}>
        <Image src={avatar} alt="" className={cx('avatar')}></Image>
        <div className={cx('user-infor')}>
          <h4 className={cx('nickname')}>
            {nickname}
            {tick && (
              <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
            )}
          </h4>
          <p className={cx('name')}>{`${first_name} ${last_name}`}</p>
        </div>
      </div>
    );
  };
  if (preview) {
    return <AccPreview item={item}>{renderItem()}</AccPreview>;
  } else {
    renderItem()
  }
}

AccountItem.propTypes = {
  item: PropTypes.object.isRequired,
  preview: PropTypes.bool,
};

export default AccountItem;
