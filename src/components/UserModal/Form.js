import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types'
import styles from './UserModal.module.scss';

import { AuthContext } from '~/context/AuthProvider';
import Button from '~/components/Button';
import * as services from '~/services/services';
import { IS_LOGIN, TOKEN, storage } from '~/storage';

const cx = classNames.bind(styles);

function Form({ formDisplay, setFormDisplay }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { setAuth, setShowModal } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = '';
    if (formDisplay === 'signup') {
      response = await services.register({
        type: 'email',
        email,
        password,
      });
    } else {
      response = await services.signin({ email, password });
    }

    if (response.error) {
      setErrMsg(response.error);
    } else {
      const userInfor = response?.data;
      const accessToken = response?.meta?.token;
      setAuth({ userInfor, accessToken });
      storage.set(TOKEN, accessToken);
      storage.set(IS_LOGIN, true);
      setEmail('');
      setPassword('');
      setShowModal(false);
    }
    setFormDisplay('signin');
  };

  return (
    <form>
      <div className={cx('form-label')}>
        {formDisplay === 'signin' ? 'Sign In' : 'Sign Up'}
      </div>
      <div className={cx('form-group', 'mb-3')}>
        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
        <input
          className={cx('form-input')}
          type="email"
          placeholder="Your Email Address"
          id="emailHelpId"
          aria-describedby="emailHelpId"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={cx('err-message')} id="emailHelpId"></div>
      </div>

      <div className={cx('form-group', 'mb-3')}>
        <FontAwesomeIcon icon={faLock} className={cx('icon')} />
        <input
          className={cx('form-input')}
          type="password"
          id="passwordHelpId"
          aria-describedby="passwordHelpId"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={cx('err-message')} id="passwordHelpId"></div>
      </div>
      <div className={cx('checkbox')}>
        <input type="checkbox" />
        <span>Remember me</span>
      </div>
      <p className={cx('errMsg')}>{errMsg}</p>
      <Button type="submit" primary onClick={handleSubmit}>
        {formDisplay === 'signin' ? 'Sign In' : 'Register'}
      </Button>
    </form>
  );
}

Form.propTypes = {
  formDisplay: PropTypes.string.isRequired,
  setFormDisplay: PropTypes.func.isRequired,
}

export default Form;
