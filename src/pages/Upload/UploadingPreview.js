import React from 'react'

import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function UploadingPreview({ progress, selectedFile, handleCancel }) {
  return (
    <div className={cx('preview-loading')}>
      <div className={cx('loading-spinner')}>
        <svg viewBox="0 0 100 100" size="64" className={cx('spinner')}>
          <circle className={cx('circle', 'unload')}></circle>
          <circle
            className={cx('circle', 'loaded')}
            strokeDasharray={`${(progress * 46.875 * 2 * 3.14).toFixed(
              2,
            )} ${46.875 * 2 * 3.14}`}
          ></circle>
        </svg>
        <span className={cx('percentage')}>{(progress*100).toFixed()}%</span>
      </div>
      <div className={cx('loading-title')}>
        <span>Uploading...</span>
        <span>{selectedFile?.name}</span>
      </div>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
}

export default React.memo(UploadingPreview)