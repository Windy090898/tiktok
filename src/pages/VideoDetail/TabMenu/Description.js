import React, { useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './TabMenu.module.scss';

import AccPreview from '~/components/Popper/AccPreview/AccPreview';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icon';
import * as followServices from '~/services/followServices';

const cx = classNames.bind(styles);

function Description({ user, video, convertDate }) {
  const captionRef = useRef();

  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [isFollow, setIsFollow] = useState(user.is_followed);
  const [followerCount, setFollowerCount] = useState(user.followers_count);

  const toggleCaptionExpanded = () => {
    setCaptionExpanded(!captionExpanded);
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
    if (!isFollow) {
      return (
        <Button primary onClick={() => handleFollow(user.id)}>
          Follow
        </Button>
      );
    } else {
      return (
        <Button outline onClick={() => handleFollow(user.id)}>
          Following
        </Button>
      );
    }
  };

  return (
    <div className={cx('description')}>
      <div className={cx('author-wrapper')}>
        <AccPreview
          item={user}
          onFollow={handleFollow}
          isFollow={isFollow}
          followerCount={followerCount}
          likeCount={user.likes_count}
        >
          <Link className={cx('user-container')} to={`/@${user.nickname}`}>
            <Image src={user.avatar} alt="" className={cx('avatar')}></Image>
            <div>
              <span className={cx('nickname')}>
                {user.nickname}
                {user.tick && (
                  <FontAwesomeIcon
                    className={cx('check')}
                    icon={faCircleCheck}
                  />
                )}
              </span>
              <br />
              <div className={cx('post-infor')}>
                <span>{`${user.first_name} ${user.last_name}`}</span>
                <span> · </span>
                <span>{convertDate(video.published_at)}</span>
              </div>
            </div>
          </Link>
        </AccPreview>
        {renderButtonFollow()}
      </div>
      <div className={cx('caption-wrapper')}>
        <div
          className={cx('caption', { expanded: captionExpanded })}
          ref={captionRef}
        >
          {video.description}
        </div>
        {captionRef.current &&
          captionRef.current.scrollHeight > captionRef.current.clientHeight && (
            <button
              className={cx('expand-btn')}
              onClick={toggleCaptionExpanded}
            >
              {captionExpanded ? 'less' : 'more'}
            </button>
          )}
      </div>
      <Link className={cx('music')}>
        <MusicIcon />
        <div className={cx('music-name')}>
          {video.music ? video.music : 'Music is playing...'}
        </div>
      </Link>
    </div>
  );
}

export default Description;
