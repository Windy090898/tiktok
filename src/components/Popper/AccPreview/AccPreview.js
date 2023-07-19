import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './AccPreview.module.scss';

import * as searchService from '~/services/searchService';

import Wrapper from '../Wrapper';
import Tippy from '@tippyjs/react/headless';
import Image from '~/components/Image';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function AccPreview({ children, item }) {
  const [previewItem, setPreviewItem] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const result = await searchService.users(item.nickname);
      setPreviewItem(result);
    };
    fetchApi();
  }, [item]);
  
  const {
    avatar,
    nickname,
    first_name,
    last_name,
    tick,
    followers_count,
    likes_count,
    bio,
  } = previewItem;
  return (
    // Using a wrapper <div> around the reference element solves this by creating a new parentNode context.
    <div>
      <Tippy
        // visible
        interactive
        delay={[800, 0]}
        placement="bottom-start"
        offset=""
        render={(attrs) => (
          <Wrapper>
            <div className={cx('account-preview')} tabIndex="-1" {...attrs}>
              <div className={cx('action')}>
                <Image src={avatar} alt="" className={cx('avatar')}></Image>
                <Button primary>Follow</Button>
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
                  <span className={cx('number')}>{followers_count}</span>
                  <span className={cx('label')}>Followers</span>
                </div>
                <div className={cx('detail-item')}>
                  <span className={cx('number')}>{likes_count}</span>
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
