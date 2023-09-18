import {
  ActiveExploreIcon,
  ActiveHomeIcon,
  ActiveLiveIcon,
  ActivePeopleIcon,
  ExploreIcon,
  HomeIcon,
  LiveIcon,
  PeopleIcon,
} from '~/components/Icon';
import routes from './routes';

const menus = {
  SIDEBAR_MENU: [
    {
      icon: <HomeIcon />,
      activeIcon: <ActiveHomeIcon />,
      title: 'For You',
      to: routes.home,
    },
    {
      icon: <PeopleIcon />,
      activeIcon: <ActivePeopleIcon />,
      title: 'Following',
      to: routes.following,
    },
    {
      newReleased: true,
      icon: <ExploreIcon />,
      activeIcon: <ActiveExploreIcon />,
      title: 'Explore',
      to: routes.explore,
    },
    {
      icon: <LiveIcon />,
      activeIcon: <ActiveLiveIcon />,
      title: 'Live',
      to: routes.live,
    },
  ],
  HEADER_MENU: [
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
      to: routes.feedback,
    },
    {
      icon: <i className="fa-solid fa-keyboard"></i>,
      title: 'Keyboard shortcuts',
    },
  ],
  FOOTER_MENU: [
  {
    title: 'Company',
    children: [
      { name: 'About', to: '/tiktok' },
      { name: 'Newsroom', to: '/tiktok' },
      { name: 'Contact', to: '/tiktok' },
      { name: 'Careers', to: '/tiktok' },
      { name: 'ByteDance', to: '/tiktok' },
    ],
  },
  {
    title: 'Programs',
    children: [
      { name: 'TikTok for Good', to: '/tiktok' },
      { name: 'Advertise', to: '/tiktok' },
      { name: 'Developers', to: '/tiktok' },
      { name: 'TikTok Rewards', to: '/tiktok' },
      { name: 'TikTok Embeds', to: '/tiktok' },
    ],
  },
  {
    title: 'Support',
    children: [
      { name: 'Help Center', to: '/tiktok' },
      { name: 'Safety Center', to: '/tiktok' },
      { name: 'Creator Portal', to: '/tiktok' },
      { name: 'Community Guidelines', to: '/tiktok' },
      { name: 'Transparency', to: '/tiktok' },
      { name: 'Accessibility', to: '/tiktok' },
    ],
  },
  {
    title: 'Legal',
    children: [
      { name: 'Terms of Use', to: '/tiktok' },
      { name: 'Privacy Policy', to: '/tiktok' },
    ],
  },
]
};

export default menus;
