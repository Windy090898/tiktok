import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { CommentIcon, HeartIcon, SaveIcon, ShareIcon } from '../Icon';
import Button from '../Button';
import * as videoServices from '~/services/videoServices';

const cx = classNames.bind(styles);

function VideoActions({ video }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes_count || 0)
  const [commentCount, setCommentCount] = useState(video.comments_count || 0)
  const [shareCount, setShareCount] = useState(video.shares_count || 0)

  useEffect(() => {
    const getVideo = async () => {
      let response = await videoServices.getVideo(video.uuid);
      setLike(response.is_liked);
    };
    getVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = () => {
    setLike(!like);
    if (!like) {
      const likeVideo = async () => {
        let response = await videoServices.likeVideo(video.id);
        setLikeCount(response.likes_count);
      };
      likeVideo();
    } else {
      const unLikeVideo = async () => {
        let response = await videoServices.unLikeVideo(video.id);
        setLikeCount(response.likes_count);
      };
      unLikeVideo();
    }
  };

  return (
    <ul className={cx('actions')}>
      <li className={cx('action-item')}>
        <Button circle className={cx('icon')} onClick={handleLike}>
          <HeartIcon className={cx('heart-icon', { like })} />
        </Button>
        <div className={cx('label')}>{likeCount}</div>
      </li>
      <li className={cx('action-item')}>
        <Button circle to="/comment" className={cx('icon')}>
          <CommentIcon />
        </Button>
        <div className={cx('label')}>{commentCount}</div>
      </li>
      {/* <li className={cx('action-item')}>
        <Button circle className={cx('icon')}>
          <SaveIcon className={cx('save-icon')} />
        </Button>
        <div className={cx('label')}>1.2M</div>
      </li> */}
      <li className={cx('action-item')}>
        <Button circle className={cx('icon')}>
          <ShareIcon />
        </Button>
        <div className={cx('label')}>{shareCount}</div>
      </li>
    </ul>
  );
}

VideoActions.propTypes = {
  video: PropTypes.object.isRequired,
}

export default VideoActions;
