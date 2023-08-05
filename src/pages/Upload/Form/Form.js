import React, { memo, useContext, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import Image from '~/components/Image';
import ReactPlayer from 'react-player';
import { UploadContext } from '~/context/UploadProvider';
import { InforIcon } from '~/components/Icon';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Form({
  description,
  setThumbnailTime,
  setDescription,
  allows,
  setAllows,
  setViewable,
  progress,
  viewable,
  allowsList,
  handleCancel,
  handlePost,
}) {
  const { videoSource, covers } = useContext(UploadContext);

  const [coverRangeValue, setCoverRangeValue] = useState(0);
  const coverVideoRef = useRef();

  const capturePreviewImage = () => {
    let currentTime = coverVideoRef.current.getCurrentTime();
    let video = coverVideoRef.current.getInternalPlayer();
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setThumbnailTime(currentTime);
  };

  const handleChangeCaption = (e) => {
    console.log('changecaption');
    setDescription(e.target.value);
  };

  const handleChangeAllows = (allow) => {
    if (allows.includes(allow)) {
      setAllows(allows.filter((item) => item !== allow));
    } else {
      setAllows([...allows, allow]);
    }
  };

  const handleChangePreview = (e) => {
    let value = e.target.value;
    setCoverRangeValue(value);
    coverVideoRef.current.seekTo(value / 100, 'fraction');
  };

  const handleChangeViewable = (e) => {
    setViewable(e.target.value);
  };

  return (
    <>
      <div className={cx('form')}>
        <div className={cx('form-group')}>
          <label htmlFor="" className={cx('caption-label')}>
            <span>Caption</span>
            <span className={cx('caption-count')}>
              {description.length}/2200
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Caption"
            value={description}
            onChange={handleChangeCaption}
          />
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="">Cover</label>
          <div className={cx('cover-wrapper')}>
            <div className={cx('cover-img-list')}>
              {progress == 1 &&
                covers.map((cover, index) => (
                  <Image
                    key={index}
                    src={cover}
                    alt=""
                    className={cx('cover-img')}
                  />
                ))}
            </div>
            <div className={cx('cover-slider')}>
              <div
                className={cx('slider-track')}
                style={{ '--slide-data': `${coverRangeValue}%` }}
              >
                <div className={cx('slider-thumb')}>
                  <div className={cx('video-slider')}>
                    {progress == 1 && (
                      <ReactPlayer
                        ref={coverVideoRef}
                        url={videoSource}
                        className={cx('video-preview')}
                        width={'100%'}
                        height={'100%'}
                        onSeek={capturePreviewImage}
                      ></ReactPlayer>
                    )}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={coverRangeValue}
                onChange={handleChangePreview}
              />
            </div>
          </div>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="">Who can watch this video</label>
          <select
            className={cx('privacy')}
            value={viewable}
            onChange={handleChangeViewable}
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="">Allow users to: </label>
          <div className={cx('allow-list')}>
            {allowsList.map((allow, index) => (
              <div key={index} className={cx('allow-item')}>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => handleChangeAllows(allow)}
                />
                {allow[0].toUpperCase() + allow.slice(1)}
              </div>
            ))}
          </div>
        </div>
        <div className={cx('form-group', 'switch-group')}>
          <label htmlFor="">
            Schedule video
            <span className={cx('infor-icon')}>
              <InforIcon />
            </span>
          </label>
          <div className={cx('switch-container')}>
            <input type="checkbox" role="switch" />
            <div className={cx('switcher')}></div>
          </div>
        </div>
        <div className={cx('button-group')}>
          <Button large onClick={handleCancel}>
            Discard
          </Button>
          <Button primary large onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(Form);
