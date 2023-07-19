import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Video from '~/components/Video'
import { MusicIcon } from '~/components/Icon';
import AccPreview from '~/components/Popper/AccPreview';

const cx = classNames.bind(styles);

function HomeItem() {
  const item = {
      "id": 4854,
      "first_name": "Death",
      "last_name": "Click!",
      "nickname": "xucana",
      "avatar": "https://files.fullstack.edu.vn/f8-tiktok/users/4854/646231eb7a517.png",
      "tick": false,
      "is_followed": false,
      "followings_count": 4,
      "followers_count": 219,
      "likes_count": 13,
      "website_url": "Https://tiktok.nghiane.online",
      "facebook_url": "",
      "youtube_url": "",
      "twitter_url": "",
      "instagram_url": "",
      "created_at": "2023-01-18 21:33:51",
      "updated_at": "2023-06-29 10:47:01",
      "popular_video": {
        "id": 1357,
        "uuid": "e9564dff-bd50-4e10-942b-cc7e19a04c6f",
        "user_id": 4854,
        "type": "",
        "thumb_url": "https://files.fullstack.edu.vn/f8-tiktok/videos/1357-63c803da7d6d7.jpg",
        "file_url": "https://files.fullstack.edu.vn/f8-tiktok/videos/1357-63c803d8e7cf7.mp4",
        "music": "Tiếng ếch kêu lofi cực mạnh",
        "description": "https://tiktok.nghiane.cf",
        "is_liked": false,
        "likes_count": 9,
        "comments_count": 5,
        "shares_count": 0,
        "views_count": 0,
        "published_at": "2023-01-18 21:36:08",
        "created_at": "2023-01-18 21:36:08",
        "updated_at": "2023-01-18 21:36:13",
        "meta": {
          "file_size": 1897342,
          "file_format": "mp4",
          "mime_type": "video/mp4",
          "playtime_string": "0:17",
          "playtime_seconds": 17.414,
          "bitrate": 862662.6851958194,
          "video": {
            "dataformat": "quicktime",
            "rotate": 0,
            "resolution_x": 576,
            "resolution_y": 1024,
            "fourcc": "avc1",
            "fourcc_lookup": "H.264/MPEG-4 AVC",
            "frame_rate": 30
          }
        }
      }
  }
  
  return (
    <div className={cx('item-container')}>
      <AccPreview item={item}>
        <Link className={cx('avatar-container')}>
          <Image src="" alt="" className={cx('avatar')}></Image>
        </Link>
      </AccPreview>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('infor')}>
            <AccPreview item={item}>
              <Link className={cx('author')}>
                <div className={cx('nickname')}>
                  hoaa.hanassi
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={cx('check')}
                  />
                </div>
                <div className={cx('name')}>Đào Lê Phương Hoa</div>
              </Link>
            </AccPreview>
            <div className={cx('caption')}>
              Nhảy 1 chút nhẹ
              <strong className={cx('hastag')}>#fyp</strong>
            </div>
            <Link className={cx('music')}>
              <MusicIcon />
              <div className={cx('music-name')}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
                earum dolorem eligendi soluta, et mollitia odio fuga laudantium
                debitis dolores voluptatum quibusdam corrupti sunt voluptate
                quidem quam consequatur maiores dolore?
              </div>
            </Link>
          </div>
          <Button outline>Follow</Button>
        </div>
        <Video />
      </div>
    </div>
  );
}

export default HomeItem;
