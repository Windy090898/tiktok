import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './HeaderModal.module.scss';

import Image from '~/components/Image';



const cx = classNames.bind(styles);
function HeaderModal({ signup, signin, img, show, onHide, onChange, children }) {

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <div className={cx('modal-container', { signup, signin })}>
        <div className={cx('img-section')}>
          <Image src={img} alt="Login Image" className={cx('img')}></Image>
          {signin && (
            <Link className={cx('link')} onClick={onChange}>
              Create an account
            </Link>
          )}
          {signup && (
            <Link className={cx('link')} onClick={onChange}>
              I am already a member
            </Link>
          )}
        </div>
          {children}
      </div>
    </Modal>
  );
}

export default HeaderModal;
