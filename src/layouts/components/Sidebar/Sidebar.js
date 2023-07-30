import React, { useContext, useEffect, useState } from 'react';

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
import Footer from './Footer';
import UserProvider, { UserContext } from '~/context/UserProvider'

const cx = classNames.bind(styles);

function Sidebar() {
  const userContext = useContext(UserContext);
  const { suggestAccs } = userContext;
  // const [renderArr, setRenderArr] = useState([]);
  // // Because suggestAccs and type will change => renderArr will change too
  // // If directly use suggestAccs to render => create error "The final argument passed to useLayoutEffect changed size between renders"
  // useEffect(() => {
  //   if (type === 'suggest') {
  //     setRenderArr(suggestAccs.filter((account) => !account.is_followed));
  //   }
  // }, [suggestAccs, type]);
  
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

      {suggestAccs && (
        <SuggestAccs
          label="Suggested accounts"
          preview
          renderArr={suggestAccs}
        />
      )}
      {/* <SuggestAccs label="Following accounts" accounts={followingAccs} /> */}

      <Footer />
    </aside>
  );
}

export default Sidebar;
