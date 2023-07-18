import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
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
import SuggestAccs from '~/components/SuggestAccs';
import { Context } from '~/context/Context';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Sidebar() {
  const context = useContext(Context)
  const suggestAccs = context.suggestAccs
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem
          icon={<HomeIcon />}
          activeIcon={<ActiveHomeIcon />}
          title="For Your"
          to={config.routes.home}
        />
        <MenuItem
          icon={<PeopleIcon />}
          activeIcon={<ActivePeopleIcon />}
          title="Following"
          to={config.routes.following}
        />
        <MenuItem
          newReleased
          icon={<ExploreIcon />}
          activeIcon={<ActiveExploreIcon />}
          title="Explore"
          to={config.routes.explore}
        />
        <MenuItem
          icon={<LiveIcon />}
          activeIcon={<ActiveLiveIcon />}
          title="LIVE"
          to={config.routes.live}
        />
      </Menu>

      <SuggestAccs label="Suggested accounts" preview accounts={suggestAccs} />
      {/* <SuggestAccs label="Following accounts" accounts={followingAccs} /> */}

      <Footer />
    </aside>
  );
}

export default Sidebar;
