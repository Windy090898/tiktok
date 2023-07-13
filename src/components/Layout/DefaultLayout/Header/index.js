import { useState } from 'react';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // option

import images from '~/assets/img';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = className.bind(styles);
const MENU_ITEMS = [
  {
    icon: <i className="fa-solid fa-earth-asia"></i>,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vn',
          title: 'Vietnamese',
        },
      ],
    },
  },
  {
    icon: <i className="fa-solid fa-circle-question"></i>,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <i className="fa-solid fa-keyboard"></i>,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const handleMenuChange = (menuItem) => {

  }
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('nav-brand')}>
          <img src={images.logo} alt="" />
        </div>
        <Tippy
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-label')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
          visible={searchResult.length > 0}
          onClickOutside
          interactive
        >
          <div className={cx('nav-search')}>
            <input type="text" placeholder="Search account and videos" />
            <button className={cx('clear')}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
            <span className={cx('loading')}>
              <i className="fa-solid fa-spinner"></i>
            </span>

            <button className={cx('search-btn')}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </Tippy>
        <div className={cx('nav-action')}>
          <Button to="/upload">
            <span className={cx('plus')}>
              <i className="fa-solid fa-plus"></i>
            </span>
            Upload
          </Button>
          <Button primary>Login</Button>
          <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
            <button className={cx('more-icon')}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </Menu>

          {/* 
          <Link to="/message" className={cx('message')}>
            <i className="fa-solid fa-location-arrow"></i>
          </Link>
          <button className={cx('inbox')}>
            <i className="fa-solid fa-message"></i>
          </button> */}
          {/* <img
            className={cx('avatar')}
            src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1682660794030081.jpeg?x-expires=1689386400&x-signature=15Kcfp7q2sKPMEHJGPx3il%2F6hvA%3D"
            alt=""
          /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
