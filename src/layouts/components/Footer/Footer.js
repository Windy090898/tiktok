import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/img';
import { Link } from 'react-router-dom';
import config from '~/config';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Footer() {
  const renderFooterContent = () => {
    return config.menus.FOOTER_MENU.map((item, index) => (
      <ul className={cx('footer-list')} key={index}>
        <li className={cx('footer-title')}>{item.title}</li>
        {item.children.map((child, index) => (
          <li key={index} className={cx('footer-item')}>
            <Link className={cx('footer-link')} to={child.to}>
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    ));
  };
  
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container')}>
        <Link to={config.routes.home} className={cx('logo')}>
          <Image src={images.footerLogo}></Image>
        </Link>
        {renderFooterContent()}
      </div>
      <div className={cx('footer-bottom')}>
        <select name="" id="">
          <option value="English">English</option>
          <option value="English">English</option>
          <option value="English">English</option>
        </select>
        <span className="copy-right">© 2023 TikTok</span>
      </div>
    </footer>
  );
}

export default Footer;
