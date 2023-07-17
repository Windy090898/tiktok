import Tippy from '@tippyjs/react/headless';
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);
const defaultFn = () => {}

function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  return (
    <Tippy
      // visible
      hideOnClick={hideOnClick}
      interactive
      offset={[10, 8]}
      delay={[0, 500]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {history.length > 1 && (
              <MenuHeader
                title={current.title}
                onBack={() =>
                  setHistory((prev) => prev.slice(0, prev.length - 1))
                }
              />
            )}
            <div className={cx('menu-list')}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory([history[0]])}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool
}

export default Menu;
