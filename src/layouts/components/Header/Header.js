import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import config from '~/config';
import images from '~/assets/img';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, MoreIcon, PlusIcon } from '~/components/Icon';
import Image from '~/components/Image';
import Search from '../Search';
import { AuthContext } from '~/context/AuthProvider';
import { IS_LOGIN, TOKEN, storage } from '~/storage';
import * as authServices from '~/services/authServices';

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
  const { setShowModal, currentUser } = useContext(AuthContext);
  const isLoggedIn = storage.get(IS_LOGIN);

  const [user, setCurrentUser] = useState(currentUser);
  const [menuDisplay, setMenuDisplay] = useState(MENU_ITEMS);

  useEffect(() => {
    const getCurrentUser = async () => {
      let response = await authServices.getCurrentUser();
      if (response) {
        setCurrentUser(response);
        const useMenu = [
          {
            icon: <i className="fa-regular fa-user"></i>,
            title: 'View profile',
            to: `/@${response.nickname}`,
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
            // to: '/',
            onClick: handleLogout,
            separate: true,
          },
        ];
        setMenuDisplay(useMenu);
      }
    };
    if (isLoggedIn) {
      getCurrentUser();
    } else {
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    let token = storage.get(TOKEN);
    await authServices.signout(token);
    window.location.href = '/';
    storage.set(IS_LOGIN, false);
    setCurrentUser(null);
  };

  const handleMenuChange = (menuItem) => {
    if (menuItem.onClick) {
      menuItem.onClick();
    }
  };

  const handleLoginShow = () => {
    setShowModal(true);
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('nav-brand')}>
          <img src={images.logo} alt="" />
        </Link>
        <Search />
        <div className={cx('nav-action')}>
          {isLoggedIn ? (
            <Fragment>
              <Button to="/upload" leftIcon={<PlusIcon />}>
                Upload
              </Button>
              <Tippy content="Message">
                <Link className={cx('action-btn')}>
                  <MessageIcon />
                </Link>
              </Tippy>
              <Tippy content="Inbox">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>26</span>
                </button>
              </Tippy>
            </Fragment>
          ) : (
            <Fragment>
              <Button onClick={handleLoginShow} leftIcon={<PlusIcon />}>
                Upload
              </Button>
              <Button primary onClick={handleLoginShow}>
                Login
              </Button>
            </Fragment>
          )}
          <Menu items={menuDisplay} onChange={handleMenuChange}>
            {isLoggedIn ? (
              <Image className={cx('avatar')} src={user.avatar} alt="" />
            ) : (
              <button className={cx('more-icon')}>
                <MoreIcon />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
