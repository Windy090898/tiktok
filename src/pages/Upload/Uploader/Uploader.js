import React, { memo, useContext, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Uploader.module.scss';
import { UploadIcon } from '~/components/Icon';
import Button from '~/components/Button/Button';
import { VideoToFrames, VideoToFramesMethod } from '~/helpers/VideoToFrames';
import { UploadContext } from '~/context/UploadProvider';

const cx = classNames.bind(styles);

function Uploader({ setStatus }) {
  const { setSelectedFile, setVideoSource, setCovers, setFileName } =
    useContext(UploadContext);

  const inputFile = useRef();

  const handleOpenUpload = () => {
    inputFile.current.click();
  };

  const getFileName = (name) => {
    const lastDotIndex = name.lastIndexOf('.');
    return name.substring(0, lastDotIndex);
  };

  const onFileChange = async (e) => {
    setCovers([]);
    setStatus('LOADING');

    const file = e.target.files[0];
    setSelectedFile(file);
    const fileURL = URL.createObjectURL(file);
    setVideoSource(fileURL);

    if (file) {
      const cleanName = getFileName(file?.name).trim();
      setFileName(cleanName);
    }

    const frames = await VideoToFrames.getFrames(
      fileURL,
      8,
      VideoToFramesMethod.totalFrames,
    );
    setCovers(frames);
  };

  return (
    <div className={cx('uploader')}>
      <div role="button" className={cx('content-container')}>
        <input
          ref={inputFile}
          type="file"
          accept="video/*"
          id="uploadVideo"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <div className={cx('content')} onClick={handleOpenUpload}>
          <UploadIcon className={cx('icon')} />
          <div className={cx('title')}>Select video to upload</div>
          <p>Or drag and drop a file</p>
          <p className={cx('sub-title')}>
            Long videos can be split into multiple parts to get more exposure
          </p>
          <div className={cx('requirement')}>
            <p>MP4 or WebM</p>
            <p>720x1280 resolution or higher</p>
            <p>Up to 30 minutes</p>
            <p>Less than 2 GB</p>
          </div>
          <Button primary className={cx('select-btn')}>
            Select file
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(Uploader);
