/* eslint-disable react/jsx-no-duplicate-props */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import Button from '~/components/Button';
import Image from '~/components/Image';

import loginImg from '~/assets/img/login-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LoginModal(props, ref) {
  const [show, setShow] = useState(false);
  useImperativeHandle(ref, () => ({
    setShow(show) {
      setShow(show);
    },
  }));

  const handleHide = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg" centered>
      <div className={cx('modal-container')}>
        <div className={cx('signup-section')}>
          <Image
            src={loginImg}
            alt="Login Image"
            className={cx('login-img')}
          ></Image>
          <Link className={cx('signup-link')}>Create an account</Link>
        </div>
        <div className={cx('signin-section')}>
          <Form>
            <Form.Label className={cx('form-label')}>Sign In</Form.Label>
            <Form.Group className="mb-3" className={cx('form-group')}>
              <FontAwesomeIcon icon={faUser} className={cx('icon')} />
              <Form.Control
                className={cx('form-input')}
                type="email"
                placeholder="Your Email Address"
                id="emailHelpId"
                aria-describedby="emailHelpId"
                autoComplete="email"
              />
              <Form.Text
                className={cx('err-message')}
                id="emailHelpId"
              ></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" className={cx('form-group')}>
              <FontAwesomeIcon icon={faLock} className={cx('icon')} />
              <Form.Control
                className={cx('form-input')}
                type="password"
                id="passwordHelpId"
                aria-describedby="passwordHelpId"
                autoComplete="current-password"
                placeholder="Password"
              />
              <Form.Text
                className={cx('err-message')}
                id="passwordHelpId"
              ></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Check
                className={cx('remember-check')}
                type="checkbox"
                label="Remember me"
              />
            </Form.Group>
            <Button type="submit" primary>
              Log in{' '}
            </Button>
          </Form>
          <div className={cx('other-login-options')}>
            <span className={cx('title')}>Or login with </span>
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
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(LoginModal);
