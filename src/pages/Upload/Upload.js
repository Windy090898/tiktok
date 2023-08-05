import React, {  useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Upload.module.scss'
import Uploader from './Uploader';
import Publisher from './Publisher';
import AuthProvider from '~/context/AuthProvider';
import UploadProvider from '~/context/UploadProvider';

const cx = classNames.bind(styles)

function Upload() {
  const [status, setStatus] = useState('IDLE')

  return (
    <AuthProvider>
      <UploadProvider>
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            {status === 'IDLE' ? (
              <Uploader
                setStatus={setStatus}
              />
            ) : (
              <Publisher
                setStatus={setStatus}
              />
            )}
          </div>
        </div>
      </UploadProvider>
    </AuthProvider>
  );
}

export default Upload