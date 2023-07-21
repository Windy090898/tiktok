import { Fragment, useRef} from 'react';
import { Link } from 'react-router-dom';

import className from 'classnames/bind';
import styles from './Header.module.scss';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';

import images from '~/assets/img';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, MoreIcon, PlusIcon } from '~/components/Icon';
import Image from '~/components/Image';
import Search from '../Search';


import LoginModal from './LoginModal';
import SignupModal from './SignupModal';



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
  const currentUser = false;
  

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

  const loginModalRef = useRef()
  const signupModalRef = useRef();
  const handleLoginShow = () => {
    loginModalRef.current.setShow(true);
  }

  const showOtherOption = () => {
    if (loginModalRef.current.show) {
      signupModalRef.current.setShow(true)
      loginModalRef.current.setShow(false);
    } 
    if (signupModalRef.current.show) {
      loginModalRef.current.setShow(true);
      signupModalRef.current.setShow(false);
    }
  }
  
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('nav-brand')}>
          <img src={images.logo} alt="" />
        </Link>
        <Search />
        <div className={cx('nav-action')}>
          <Button to="/upload" leftIcon={<PlusIcon />}>
            Upload
          </Button>
          {currentUser ? (
            <Fragment>
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
            <Button primary onClick={handleLoginShow}>
              Login
            </Button>
          )}
          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                className={cx('avatar')}
                src="sgn-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1682660794030081.jpeg?x-expires=1689386400&x-signature=15Kcfp7q2sKPMEHJGPx3il%2F6hvA%3D"
                alt=""
              />
            ) : (
              <button className={cx('more-icon')}>
                <MoreIcon />
              </button>
            )}
          </Menu>
        </div>
      </div>
      <LoginModal ref={loginModalRef} onChange={showOtherOption} />
      <SignupModal ref={signupModalRef} onChange={showOtherOption} />
    </header>
  );
}

export default Header;
