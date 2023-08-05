import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

import * as VideoServices from '~/services/videoServices';
import UploadingPreview from './UploadingPreview';
import MobilePreview from './MobilePreview';
import { UploadContext } from '~/context/UploadProvider';
import Form from './Form';

const cx = classNames.bind(styles);

function Publisher({ setStatus }) {
  const { selectedFile, setSelectedFile, videoSource, covers, fileName } =
    useContext(UploadContext);
  const allowsList = ['comment', 'duet', 'stitch'];
  ;

  const [thumbnailTime, setThumbnailTime] = useState(0);
  const [uploading, setUploading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState(fileName);
  const [viewable, setViewable] = useState('public');
  const [allows, setAllows] = useState(allowsList);
  const [music, setMusic] = useState('Music lalala ....');
  const [videoId, setVideoId] = useState();

  const handleCancel = () => {
    const deleteVideo = async () => {
      await VideoServices.deleteVideo(videoId);
      setSelectedFile();
      alert('Cancelled');
      setStatus('IDLE');
    };
    if (videoId) {
      deleteVideo();
    } else {
      alert('Video upload failed to API')
      setStatus('IDLE');
    }
  }


  useEffect(() => {
    if (selectedFile) {
      // setUploading(true);
      const formData = new FormData();
      formData.append('description', description);
      formData.append('thumbnail_time', thumbnailTime);
      formData.append('music', music);
      formData.append('viewable', viewable);
      allows.forEach(item => formData.append('allows[]', item));
      formData.append('upload_file', selectedFile);

      const uploadVideo = async () => {
        const handleProgress = (progress) => {
          const percentage = progress.loaded / progress.total;
          setProgress(percentage);
        };
        let response = await VideoServices.createNewVideo(
          formData,
          handleProgress,
        );
        setVideoId(response?.id);
        setProgress(1);
        setUploading(false);
      };

      if (uploading) {
        uploadVideo();
      }
    }
    return () => {
      console.log('selected file change');
    };
  }, [selectedFile]);

  const handlePost = () => {
    const updateVideo = async () => {
      const formData = new FormData();
      description !== selectedFile?.name &&
        formData.append('description', description);
      thumbnailTime !== 0 && formData.append('thumbnail_time', thumbnailTime);
      // formData.append('music', music);
      viewable !== 'public' && formData.append('viewable', viewable);
      allows !== allowsList &&
        allows.forEach((item) => formData.append('allows[]', item));
      // formData.append('upload_file', selectedFile);
      await VideoServices.updateVideo(videoId, formData);
      alert('Successfully post video');
      setStatus('IDLE');
    };
    updateVideo();
  }

  return (
    <div className={cx('publisher')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>Upload video</h3>
        <p className={cx('sub-title')}>Post a video to your account</p>
      </div>
      <div className={cx('content')}>
        <div className={cx('preview')}>
          {uploading ? (
            <UploadingPreview
              progress={progress}
              selectedFile={selectedFile}
              handleCancel={handleCancel}
            />
          ) : (
            <MobilePreview
              // videoSource={videoSource}
              description={description}
              music={music}
            />
          )}
        </div>
        <Form
          description={description}
          setThumbnailTime={setThumbnailTime}
          setDescription={setDescription}
          allows={allows}
          setAllows={setAllows}
          setViewable={setViewable}
          progress={progress}
          viewable={viewable}
          allowsList={allowsList}
          handleCancel={handleCancel}
          handlePost={handlePost}
          videoSource={videoSource}
          covers={covers}
        />
      </div>
    </div>
  );
}

export default memo(Publisher);
