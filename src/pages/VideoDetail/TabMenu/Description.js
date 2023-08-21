import React, { useContext, useRef, useState } from 'react';

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
import { IS_LOGIN, storage } from '~/storage';
import { AuthContext } from '~/context/AuthProvider';
import { VideoDetailContext } from '~/context/VideoDetailProvider';
import FollowButton from '~/components/FollowButton/FollowButton';

const cx = classNames.bind(styles);

function Description() {
  const {
    author,
    video,
    authorIsFollow,
    setAuthorIsFollow,
    authorFollowCount,
    setAuthorFollowCount,
    convertDate,
    totalVideoLike,
  } = useContext(VideoDetailContext);
  const captionRef = useRef();

  const [captionExpanded, setCaptionExpanded] = useState(false);

  const toggleCaptionExpanded = () => {
    setCaptionExpanded(!captionExpanded);
  };

  return (
    <div className={cx('description')}>
      <div className={cx('author-wrapper')}>
        <AccPreview
          item={author}
          likeCount={totalVideoLike}
          followerCount={authorFollowCount}
          setFollowerCount={setAuthorFollowCount}
          isFollow={authorIsFollow}
          setIsFollow={setAuthorIsFollow}
        >
          <Link className={cx('author-container')} to={`/@${author.nickname}`}>
            <Image src={author.avatar} alt="" className={cx('avatar')}></Image>
            <div>
              <span className={cx('nickname')}>
                {author.nickname}
                {author.tick && (
                  <FontAwesomeIcon
                    className={cx('check')}
                    icon={faCircleCheck}
                  />
                )}
              </span>
              <br />
              <div className={cx('post-infor')}>
                <span>{`${author.first_name} ${author.last_name}`}</span>
                <span> · </span>
                <span>{convertDate(video.published_at)}</span>
              </div>
            </div>
          </Link>
        </AccPreview>
        <FollowButton
          isFollow={authorIsFollow}
          setIsFollow={setAuthorIsFollow}
          setFollowerCount={setAuthorFollowCount}
          tippyRef
          id={author.id}
        />
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
