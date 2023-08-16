import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoDetail.module.scss';
import {
  ArrowIcon,
  CloseIcon,
  CommentIcon,
  EmailIcon,
  EmbededIcon,
  FacebookIcon,
  FlagIcon,
  HeartBreakIcon,
  HeartIcon,
  LineIcon,
  LinkedInIcon,
  MentionIcon,
  MoreIcon,
  MusicIcon,
  PinterestIcon,
  PlayIcon,
  RedditIcon,
  SaveIcon,
  ShareIcon,
  ShareMessageIcon,
  SmileIcon,
  TelegramIcon,
  TwitterIcon,
  VolumeOnIcon,
  WhatsappIcon,
} from '~/components/Icon';
import Video from '~/components/Video';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as videoServices from '~/services/videoServices';
import * as commentServices from '~/services/commentServices';
import AccPreview from '~/components/Popper/AccPreview/AccPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image/Image';
import Button from '~/components/Button';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper } from '~/components/Popper';
import VideoContainer from './VideoContainer/VideoContainer';
import ContentContainer from './ContentContainer/ContentContainer';

const cx = classNames.bind(styles);



function VideoDetail() {
  const { uuid, nickname } = useParams();
  const [video, setVideo] = useState();
  const [user, setUser] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      const response = await videoServices.getVideo(uuid);
      setVideo(response);
      setUser(response.user);
    };
    getVideo();
  }, []);

  if (video && user) {
    return (
      <div className={cx('wrapper')}>
        <VideoContainer video={video} />
        <ContentContainer user={user} video={video} />
        
      </div>
    );
  }
}

export default VideoDetail;
