import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuHeader({ title, onBack}) {
 
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h4 className={cx('header-title')}>{ title }</h4>
    </header>
  );
}

export default MenuHeader;
