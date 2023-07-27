import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icon';
import AccPreview from '~/components/Popper/AccPreview';

const cx = classNames.bind(styles);

function VideoHeader({ video }) {
  const { user, description, music } = video;

  return (
    <div className={cx('header')}>
      <div className={cx('infor')}>
        <AccPreview item={user}>
          <Link className={cx('author')}>
            <div className={cx('nickname')}>
              {user.nickname}
              <FontAwesomeIcon icon={faCircleCheck} className={cx('check')} />
            </div>
            <div
              className={cx('name')}
            >{`${user.first_name} ${user.last_name}`}</div>
          </Link>
        </AccPreview>
        <div className={cx('caption')}>
          {description}
          {/* <strong className={cx('hastag')}>#fyp</strong> */}
        </div>
        <Link className={cx('music')}>
          <MusicIcon />
          <div className={cx('music-name')}>
            {music === '' ? 'Music is playing...' : music}
          </div>
        </Link>
      </div>
      <Button outline>Follow</Button>
    </div>
  );
}

VideoHeader.propTypes = {
  video: PropTypes.object.isRequired,
}

export default VideoHeader;
