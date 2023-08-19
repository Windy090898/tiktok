import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './AccPreview.module.scss';

import Wrapper from '../Wrapper';
import Image from '~/components/Image';
import Button from '~/components/Button/Button';
import { IS_LOGIN, storage } from '~/storage';
import { AuthContext } from '~/context/AuthProvider';
import * as followServices from '~/services/followServices';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function AccPreview({
  children,
  item,
  likeCount,
  followerCount,
  isFollow,
  setFollowerCount,
  setIsFollow,
  isLogin = storage.get(IS_LOGIN),
}) {

  const { id, avatar, nickname, first_name, last_name, tick, bio } =
    item;

  const { setShowModal } = useContext(AuthContext);

  const tippyRef = useRef();

  const handleCreate = (tippy) => {
    tippyRef.current = tippy;
  };

  const handleLoginShow = () => {
    setShowModal(true);
    tippyRef.current.hide();
  };


  const handleFollow = (id) => {
    const followUser = async (id) => {
      let response = await followServices.follow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };

    const unFollowUser = async (id) => {
      let response = await followServices.unFollow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    if (isFollow) {
      unFollowUser(id);
    } else {
      followUser(id);
    }
    
  };

  const renderButtonFollow = () => {
    if (!isLogin) {
      return (
        <Button primary onClick={handleLoginShow}>
          Follow
        </Button>
      );
    } else if (!isFollow) {
      return (
        <Button primary onClick={() => handleFollow(id)}>
          Follow
        </Button>
      );
    } else {
      return (
        <Button outline onClick={() => handleFollow(id)}>
          Following
        </Button>
      );
    }
  };
  return (
    // Using a wrapper <div> around the reference element solves this by creating a new parentNode context.
    <div>
      <Tippy
        onCreate={handleCreate}
        interactive
        delay={[600, 0]}
        placement="bottom-start"
        offset=""
        render={(attrs) => (
          <Wrapper>
            <div className={cx('account-preview')} tabIndex="-1" {...attrs}>
              <div className={cx('action')}>
                <Image src={avatar} alt="" className={cx('avatar')}></Image>
                {renderButtonFollow()}
              </div>
              <div className={cx('user-infor')}>
                <h4 className={cx('nickname')}>
                  {nickname}
                  {tick && (
                    <FontAwesomeIcon
                      className={cx('check')}
                      icon={faCircleCheck}
                    />
                  )}
                </h4>
                <p className={cx('name')}>{`${first_name} ${last_name}`}</p>
              </div>
              <div className={cx('user-detail')}>
                <div className={cx('detail-item')}>
                  <span className={cx('number')}>{followerCount}</span>
                  <span className={cx('label')}>Followers</span>
                </div>
                <div className={cx('detail-item')}>
                  <span className={cx('number')}>{likeCount}</span>
                  <span className={cx('label')}>Likes</span>
                </div>
              </div>
              <p className={cx('user-bio')}>{bio}</p>
            </div>
          </Wrapper>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

AccPreview.propTypes = {
  children: PropTypes.node.isRequired,
  item: PropTypes.object.isRequired,
};

export default AccPreview;
