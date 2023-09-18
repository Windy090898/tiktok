import React, { useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import config from '~/config';
import SuggestAccs from '~/components/SuggestAccs';
import SidebarFooter from './SidebarFooter';
import { UserContext } from '~/context/UserProvider';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Sidebar() {
  const { suggestAccs } = useContext(UserContext);

  return (
    <aside className={cx('wrapper')}>
      <nav>
        {config.menus.SIDEBAR_MENU.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            activeIcon={item.activeIcon}
            title={item.title}
            to={item.to}
          />
        ))}
      </nav>
      {suggestAccs && (
        <SuggestAccs
          label="Suggested accounts"
          preview
          renderArr={suggestAccs}
        />
      )}
      {/* <SuggestAccs label="Following accounts" accounts={followingAccs} /> */}
      <SidebarFooter />
    </aside>
  );
}

export default Sidebar;
