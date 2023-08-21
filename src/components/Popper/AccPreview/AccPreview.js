import React, { useContext, useRef } from 'react';
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
import { UserContext } from '~/context/UserProvider';
import FollowButton from '~/components/FollowButton/FollowButton';

const cx = classNames.bind(styles);

function AccPreview({
  children,
  item,
  likeCount,
  followerCount,
  isFollow,
  setFollowerCount,
  setIsFollow,
}) {
  const { id, avatar, nickname, first_name, last_name, tick, bio } = item;

  const tippyRef = useRef();

  const handleCreate = (tippy) => {
    tippyRef.current = tippy;
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
                <FollowButton
                  isFollow={isFollow}
                  setIsFollow={setIsFollow}
                  setFollowerCount={setFollowerCount}
                  tippyRef={tippyRef}
                  id={id}
                />
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
