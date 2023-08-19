import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TabMenu.module.scss';
import {
  CommentIcon,
  EmailIcon,
  EmbededIcon,
  FacebookIcon,
  HeartIcon,
  LineIcon,
  LinkedInIcon,
  PinterestIcon,
  RedditIcon,
  SaveIcon,
  ShareIcon,
  ShareMessageIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from '~/components/Icon';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { Wrapper } from '~/components/Popper';
import Description from './Description';
import * as videoServices from '~/services/videoServices';
import { VideoDetailContext } from '~/context/VideoDetailProvider';

const cx = classNames.bind(styles);
const SHARE_ITEMS = [
  {
    tippyContent: 'Embeded',
    icon: <EmbededIcon />,
  },
  {
    tippyContent: 'Send to friends',
    icon: <ShareMessageIcon />,
  },
  {
    tippyContent: 'Share to Facebook',
    icon: <FacebookIcon />,
  },
  {
    tippyContent: 'Share to Whatsapp',
    icon: <WhatsappIcon />,
  },
  {
    tippyContent: 'Share to Twitter',
    icon: <TwitterIcon />,
  },
];

const SUB_SHARE_ITEMS = [
  {
    icon: <LinkedInIcon />,
    label: 'Share to LinkedIn',
  },
  {
    icon: <RedditIcon />,
    label: 'Share to Reddit',
  },
  {
    icon: <TelegramIcon />,
    label: 'Share to Telegram',
  },
  {
    icon: <EmailIcon />,
    label: 'Share to Email',
  },
  {
    icon: <LineIcon />,
    label: 'Share to Line',
  },
  {
    icon: <PinterestIcon />,
    label: 'Share to Pinterest',
  },
];

function TabMenu({ totalComments, borderDisplay, commentCount }) {
  const { video, videoLikeCount, setVideoLikeCount } =
    useContext(VideoDetailContext);
  // const [likeCount, setLikeCount] = useState(video.likes_count);
  const [shareCount, setShareCount] = useState(video.shares_count);

  const [like, setLike] = useState(video.is_liked);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleLikeVideo = () => {
    setLike(!like);
    if (!like) {
      const likeVideo = async () => {
        let response = await videoServices.likeVideo(video.id);
        setVideoLikeCount(response.likes_count);
      };
      likeVideo();
    } else {
      const unLikeVideo = async () => {
        let response = await videoServices.unLikeVideo(video.id);
        setVideoLikeCount(response.likes_count);
      };
      unLikeVideo();
    }
  };

  const handleCopyLink = () => {
    setLinkCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setLinkCopied(false);
    }, [2000]);
  };

  return (
    <>
      <div className={cx('tab-menu-wrapper')}>
        <Description />
        <div className={cx('main-content')}>
          <div className={cx('video-count-share')}>
            <div className={cx('video-count')}>
              <div className={cx('count-item')}>
                <Button
                  circle
                  leftIcon={
                    <HeartIcon
                      width="2rem"
                      height="2rem"
                      className={cx('round-icon', { like })}
                    />
                  }
                  className={cx('icon')}
                  onClick={handleLikeVideo}
                >
                  <span className={cx('label')}>{videoLikeCount}</span>
                </Button>
              </div>
              <div className={cx('count-item')}>
                <Button
                  circle
                  leftIcon={
                    <CommentIcon
                      width="2rem"
                      height="2rem"
                      className={cx('round-icon')}
                    />
                  }
                  className={cx('icon')}
                >
                  <span className={cx('label')}>{commentCount}</span>
                </Button>
              </div>
              <div className={cx('count-item')}>
                <Button
                  circle
                  leftIcon={
                    <SaveIcon
                      width="2rem"
                      height="2rem"
                      className={cx('round-icon')}
                    />
                  }
                  className={cx('icon')}
                >
                  <span className={cx('label')}>{shareCount}</span>
                </Button>
              </div>
            </div>
            <div className={cx('video-share')}>
              {SHARE_ITEMS.map((item, index) => (
                <Tippy content={item.tippyContent} key={index}>
                  <Link>{item.icon}</Link>
                </Tippy>
              ))}
              <HeadlessTippy
                interactive
                render={(attrs) => (
                  <Wrapper className={cx()}>
                    <div
                      tabIndex="-1"
                      {...attrs}
                      className={cx('share-wrapper')}
                    >
                      {SUB_SHARE_ITEMS.map((item, index) => (
                        <Link className={cx('tippy-link-item')} key={index}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </Wrapper>
                )}
              >
                <Link>
                  <ShareIcon width="1.6rem" height="1.6rem" />
                </Link>
              </HeadlessTippy>
            </div>
          </div>
          <div className={cx('copy-link-container')}>
            <p className={cx('copy-link')}>{window.location.href}</p>
            <button className={cx('copy-link-btn')} onClick={handleCopyLink}>
              Copy link
            </button>
          </div>
          <div className={cx('tab-menu-container')}>
            <div>
              Comments (<span>{totalComments}</span>)
            </div>
          </div>
          {borderDisplay && <div className={cx('border')}></div>}
        </div>
      </div>
      <div className={cx('copy-link-noti', { linkCopied })}>Copied</div>
    </>
  );
}

export default TabMenu;
