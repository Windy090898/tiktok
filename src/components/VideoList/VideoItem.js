import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './VideoList.module.scss';

import Image from '~/components/Image';
import Video from '~/components/Video';
import AccPreview from '~/components/Popper/AccPreview';
import * as followServices from '~/services/followServices';
import { IS_LOGIN, storage } from '~/storage';
import { AuthContext } from '~/context/AuthProvider';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icon';
import { CommentIcon, HeartIcon, ShareIcon } from '~/components/Icon';
import * as videoServices from '~/services/videoServices';

const cx = classNames.bind(styles);

function VideoItem({ video }) {
  const {
    user,
    description,
    music,
    likes_count,
    comments_count,
    shares_count,
  } = video;
  const [isFollow, setIsFollow] = useState(user.is_followed);
  const [followerCount, setFollowerCount] = useState(user.followers_count);
  const [like, setLike] = useState(false);
  const [userLikeCount, setUserLikeCount] = useState(user.likes_count);
  const [likeCount, setLikeCount] = useState(likes_count || 0);
  const [commentCount, setCommentCount] = useState(comments_count || 0);
  const [shareCount, setShareCount] = useState(shares_count || 0);

  let isLogin = storage.get(IS_LOGIN);
  const { setShowModal } = useContext(AuthContext);
  const handleLoginShow = () => {
    setShowModal(true);
  };

  const handleFollow = (id) => {
    let response;
    const followUser = async () => {
      response = await followServices.follow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    const unFollowUser = async () => {
      response = await followServices.unFollow(id);
      setFollowerCount(response.followers_count);
      setIsFollow(!isFollow);
    };
    if (isFollow) {
      unFollowUser();
    } else {
      followUser();
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

  const handleLike = () => {
    setLike(!like);
    if (!like) {
      const likeVideo = async () => {
        let response = await videoServices.likeVideo(video.id);
        setLikeCount(response.likes_count);
        setUserLikeCount(response.user.likes_count);
      };
      likeVideo();
    } else {
      const unLikeVideo = async () => {
        let response = await videoServices.unLikeVideo(video.id);
        setLikeCount(response.likes_count);
        setUserLikeCount(response.user.likes_count);

      };
      unLikeVideo();
    }
  };

  return (
    <>
      <AccPreview
        item={user}
        isFollow={isFollow}
        followerCount={followerCount}
        likeCount={userLikeCount}
        isLogin={isLogin}
        setFollowerCount={setFollowerCount}
        setIsFollow={setIsFollow}
      >
        <Link className={cx('avatar-container')} to={`/@${user.nickname}`}>
          <Image src={user.avatar} alt="" className={cx('avatar')}></Image>
        </Link>
      </AccPreview>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('infor')}>
            <AccPreview
              item={user}
              isFollow={isFollow}
              followerCount={followerCount}
              likeCount={userLikeCount}
              isLogin={isLogin}
              setFollowerCount={setFollowerCount}
              setIsFollow={setIsFollow}
            >
              <Link className={cx('author')} to={`/@${user.nickname}`}>
                <div className={cx('nickname')}>
                  {user.nickname}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={cx('check')}
                  />
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
          {renderButtonFollow()}
        </div>
        <div className={cx('body')}>
          <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
              <Video video={video} control volume={50} loop />
            </div>
          </div>
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
            <li className={cx('action-item')}>
              <Button circle className={cx('icon')}>
                <ShareIcon />
              </Button>
              <div className={cx('label')}>{shareCount}</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default VideoItem;
