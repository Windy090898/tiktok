import { Fragment, useState } from 'react';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // option

import images from '~/assets/img';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { Link } from 'react-router-dom';

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
  const currentUser = true;

  const handleMenuChange = (menuItem) => { };
  
  const userMenu = [
    {
      icon: <i className="fa-regular fa-user"></i>,
      title: 'View profile',
      to: '/profile',
    },
    {
      icon: <i className="fa-solid fa-coins"></i>,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <i className="fa-solid fa-gear"></i>,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('nav-brand')}>
          <img src={images.logo} alt="" />
        </div>
        <HeadlessTippy
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
        </HeadlessTippy>
        <div className={cx('nav-action')}>
          <Button to="/upload">
            <span className={cx('plus')}>
              <i className="fa-solid fa-plus"></i>
            </span>
            Upload
          </Button>
          {currentUser ? (
            <Fragment>
              <Tippy content='Message'>
                <Link className={cx('message', 'action-btn')}>
                  <i className="fa-solid fa-location-arrow"></i>
                </Link>
              </Tippy>
              <Tippy content='Inbox'>
                <button className={cx('inbox', 'action-btn')}>
                  <i className="fa-solid fa-message"></i>
                </button>
              </Tippy>
            </Fragment>
          ) : (
              <Button primary>Login</Button>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1682660794030081.jpeg?x-expires=1689386400&x-signature=15Kcfp7q2sKPMEHJGPx3il%2F6hvA%3D"
                alt=""
              />
            ) : (
              <button className={cx('more-icon')}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
