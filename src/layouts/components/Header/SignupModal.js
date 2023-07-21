import HeaderModal from "~/components/HeaderModal";
import signupImg from '~/assets/img/signup-image.jpg';
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import Button from '~/components/Button';
import { Link } from "react-router-dom";

const cx = className.bind(styles);


function LoginModal({ onChange }, ref) {
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
      signup
      img={signupImg}
      show={show}
      onHide={handleHide}
      onChange={onChange}
    >
      <div className={cx('form-section')}>
        <Form>
          <Form.Label className={cx('form-label')}>Sign Up</Form.Label>
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
              label={
                <span>
                  I agree all statements in 
                  <Link className={cx('term-link')}>Terms of service</Link>
                </span>
              }
            />
          </Form.Group>
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
      </div>
    </HeaderModal>
  );
}

export default forwardRef(LoginModal);
