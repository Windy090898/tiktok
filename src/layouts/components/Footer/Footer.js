import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/img';
import { Link } from 'react-router-dom';
import config from '~/config';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const FOOTER_ITEMS = [
  {
    title: 'Company',
    children: [
      { name: 'About', to: '/' },
      { name: 'Newsroom', to: '/' },
      { name: 'Contact', to: '/' },
      { name: 'Careers', to: '/' },
      { name: 'ByteDance', to: '/' },
    ],
  },
  {
    title: 'Programs',
    children: [
      { name: 'TikTok for Good', to: '/' },
      { name: 'Advertise', to: '/' },
      { name: 'Developers', to: '/' },
      { name: 'TikTok Rewards', to: '/' },
      { name: 'TikTok Embeds', to: '/' },
    ],
  },
  {
    title: 'Support',
    children: [
      { name: 'Help Center', to: '/' },
      { name: 'Safety Center', to: '/' },
      { name: 'Creator Portal', to: '/' },
      { name: 'Community Guidelines', to: '/' },
      { name: 'Transparency', to: '/' },
      { name: 'Accessibility', to: '/' },
    ],
  },
  {
    title: 'Legal',
    children: [
      { name: 'Terms of Use', to: '/' },
      { name: 'Privacy Policy', to: '/' },
    ],
  },
];

function Footer() {
  const renderFooterContent = () => {
    return FOOTER_ITEMS.map((item, index) => (
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
