import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ newReleased, icon, activeIcon, title, to }) {
  return (
    <NavLink
      to={to}
      className={(nav) => cx('menu-item', { active: nav.isActive })}
    >
      {({ isActive }) => (
        <>
          {isActive ? activeIcon : icon}
          <span className={cx('title')}>{title}</span>
          {newReleased && <span className={cx('new-released')}>New</span>}
        </>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  newReleased: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
export default memo(MenuItem);
