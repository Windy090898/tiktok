import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SuggestAccs.module.scss';

import Image from '../Image';
import AccPreview from '~/components/Popper/AccPreview';
import * as followServices from '~/services/followServices';
import { UserContext } from '~/context/UserProvider';
import { Link } from 'react-router-dom';
import { IS_LOGIN, storage } from '~/storage';

const cx = classNames.bind(styles);

function AccountItem({ preview, item }) {
  const {
    avatar,
    tick,
    first_name,
    last_name,
    nickname,
    followers_count,
    likes_count,
    is_followed,
  } = item;

  const [isFollow, setIsFollow] = useState(is_followed);
  const [followerCount, setFollowerCount] = useState(followers_count);

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
      <Link className={cx('account-item')} to={`/@${nickname}`}>
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
      </Link>
    );
  };
  if (preview) {
    return (
      <AccPreview
        item={item}
        likeCount={likes_count}
        isFollow={isFollow}
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
        setIsFollow={setIsFollow}
        isLogin={storage.get(IS_LOGIN)}
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
