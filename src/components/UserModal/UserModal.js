import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames/bind';
import styles from './UserModal.module.scss';

import { AuthContext } from '~/context/AuthProvider';
import Image from '../Image/Image';
import signinImg from '~/assets/img/login-image.jpg';
import signupImg from '~/assets/img/signup-image.jpg';
import Button from '~/components/Button';
import Form from './Form';

const cx = classNames.bind(styles);

function UserModal() {
  const [formDisplay, setFormDisplay] = useState('signin');

  const modalRef = useRef();
  const {showModal, setShowModal} = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target === modalRef.current) {
        setShowModal(false);
      }
    });
  }, [setShowModal]);

  if (showModal) {
    return (
      <div className={cx('wrapper')} ref={modalRef}>
        <div
          className={cx('content-container', {
            signup: formDisplay === 'signup' ? true : false,
          })}
        >
          <div className={cx('img-section')}>
            {formDisplay === 'signin' && (
              <>
                <Image
                  src={signinImg}
                  alt="Signin Image"
                  className={cx('img')}
                ></Image>
                <Button text onClick={() => setFormDisplay('signup')}>
                  Create an account
                </Button>
              </>
            )}

            {formDisplay === 'signup' && (
              <>
                <Image
                  src={signupImg}
                  alt="SignUp Image"
                  className={cx('img')}
                ></Image>
                <Button text onClick={() => setFormDisplay('signin')}>
                  I am already a member
                </Button>
              </>
            )}
          </div>
          <div className={cx('form-section')}>
            <Form formDisplay={formDisplay} setFormDisplay={setFormDisplay} />
            {formDisplay === 'signin' && (
              <div className={cx('other-options')}>
                <span className={cx('title')}>Or sign in with </span>
                <span>
                  <Button square className={cx('icon-facebook')}>
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>
                  <Button square className={cx('icon-twitter')}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button square className={cx('icon-google')}>
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserModal;
