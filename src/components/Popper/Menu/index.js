import Tippy from '@tippyjs/react/headless';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);
const defaultFn = () => {}

function Menu({ children, items = [], onChange = defaultFn }) {
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
      interactive
      delay={[0, 500]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {history.length > 1 && (
              <MenuHeader
                title="Language"
                onBack={() =>
                  setHistory((prev) => prev.slice(0, prev.length - 1))
                }
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
