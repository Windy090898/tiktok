import { Form } from 'react-bootstrap';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import HeaderModal from '~/components/HeaderModal';
import loginImg from '~/assets/img/login-image.jpg';
import Button from '~/components/Button';


const cx = className.bind(styles);

function LoginModal({ onChange}, ref) {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show,
    setShow(show) {
      setShow(show);
    },
  }));

  const handleHide = () => {
    setShow(false);
  };
  return (
    <HeaderModal
      signin
      img={loginImg}
      show={show}
      onHide={handleHide}
      onChange={onChange}
    >
      <div className={cx('form-section')}>
        <Form>
          <Form.Label className={cx('form-label')}>Sign In</Form.Label>
          <Form.Group className={cx('form-group', 'mb-3')}>
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

          <Form.Group className={cx('form-group', 'mb-3')}>
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
              className={cx('checkbox')}
              type="checkbox"
              label="Remember me"
            />
          </Form.Group>
          <Button type="submit" primary>
            Sign In
          </Button>
        </Form>
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
      </div>
    </HeaderModal>
  );
}

export default forwardRef(LoginModal);
