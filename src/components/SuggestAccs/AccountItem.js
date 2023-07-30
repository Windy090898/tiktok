import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SuggestAccs.module.scss';

import Image from '../Image';
import AccPreview from '~/components/Popper/AccPreview';
import * as userServices from '~/services/userServices';
import * as followServices from '~/services/followServices';
import { UserContext } from '~/context/UserProvider';

const cx = classNames.bind(styles);

function AccountItem({ preview, item }) {
  const {
    avatar,
    tick,
    first_name,
    last_name,
    nickname,
    followers_count,
    is_followed,
  } = item;

  const [isFollow, setIsFollow] = useState(is_followed);
  const { followedList, setFollowedList } = useContext(UserContext);

  const handleFollow = (id) => {
    const followUser = async () => {
      await followServices.follow(id);
      setFollowedList([...followedList, id]);
      setIsFollow(!isFollow);
    };
    followUser();
  };
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
    return (
      <AccPreview
        item={item}
        followerCount={followers_count}
        isFollow={isFollow}
        onFollow={handleFollow}
      >
        {renderItem()}
      </AccPreview>
    );
  } else {
    renderItem();
  }
}

AccountItem.propTypes = {
  item: PropTypes.object.isRequired,
  preview: PropTypes.bool,
};

export default AccountItem;
