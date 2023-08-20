import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ContentContainer.module.scss';

import * as commentServices from '~/services/commentServices';
import Image from '~/components/Image';
import { HeartIcon } from '~/components/Icon';
import AccPreview from '~/components/Popper/AccPreview/AccPreview';
import { VideoDetailContext } from '~/context/VideoDetailProvider';

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
  const {
    author,
    authorIsFollow,
    setAuthorIsFollow,
    authorFollowCount,
    setAuthorFollowCount,
    convertDate,
    totalVideoLike,
  } = useContext(VideoDetailContext);

  const [commentLikeCount, setCommentLikeCount] = useState(comment.likes_count);
  const [liked, setLiked] = useState(false);
  const [followerCount, setFollowerCount] = useState(
    comment.user.followers_count,
  );
  const [isFollow, setIsFollow] = useState(comment.user.is_followed);

  // Check if the comment user is the author and handle change the follow status and follower count accordingly (for the accpreview section)
  useEffect(() => {
    if (author.id === comment.user.id) {
      setAuthorIsFollow(isFollow);
      setAuthorFollowCount(followerCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollow]);

  useEffect(() => {
    if (author.id === comment.user.id) {
      setIsFollow(authorIsFollow);
      setFollowerCount(authorFollowCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorIsFollow]);

  const likeComment = async () => {
    let response = await commentServices.likeComment(comment.id);
    setCommentLikeCount(response.likes_count);
  };
  const unLikeComment = async () => {
    let response = await commentServices.unLikeComment(comment.id);
    setCommentLikeCount(response.likes_count);
  };
  const handleLikeComment = () => {
    setLiked(!liked);
    if (!liked) {
      likeComment();
    } else {
      unLikeComment();
    }
  };

  return (
    <div className={cx('comment-item')}>
      <AccPreview
        item={comment.user}
        likeCount={totalVideoLike}
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
        isFollow={isFollow}
        setIsFollow={setIsFollow}
      >
        <Image
          src={comment.user.avatar}
          alt=""
          className={cx('avatar')}
        ></Image>
      </AccPreview>
      <div className={cx('comment-content')}>
        <AccPreview
          item={comment.user}
          likeCount={totalVideoLike}
          followerCount={followerCount}
          setFollowerCount={setFollowerCount}
          isFollow={isFollow}
          setIsFollow={setIsFollow}
        >
          <div className={cx('nickname')}>
            {comment.user.nickname}
            {comment.user.tick && (
              <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
            )}
          </div>
        </AccPreview>
        <div className={cx('comment')}>{comment.comment}</div>
        <div className={cx('comment-infor')}>
          <div className={cx('comment-date')}>
            {convertDate(comment.updated_at)}
          </div>
          <div className={cx('comment-like')}>
            <span onClick={handleLikeComment}>
              <HeartIcon
                width="2rem"
                height="2rem"
                className={cx('comment-like-icon', { liked })}
              />
            </span>
            <span>{commentLikeCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
