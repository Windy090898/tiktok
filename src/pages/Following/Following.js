
import React, { useContext } from 'react'
import Button from '~/components/Button';
import VideoList from '~/components/VideoList/'
import { AuthContext } from '~/context/AuthProvider';
import { IS_LOGIN, storage } from '~/storage';

function Following() {
  const isLogin = storage.get(IS_LOGIN);
  const { setShowModal } = useContext(AuthContext);

  return isLogin ? (
    <VideoList videoType="following"/>
  ) : (
    <div className='not-login-message'>
      <Button outline onClick={() => setShowModal(true)}>
        Log in
      </Button>{' '}
      to view videos from your following list!
    </div>
  );
}

export default Following