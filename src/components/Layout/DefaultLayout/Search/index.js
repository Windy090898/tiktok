import React, { useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';

const cx = className.bind(styles);

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([1]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const handleClear = () => {
    setSearchText('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleShowResult = () => {
    setShowResult(true);
  };
  return (
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
      visible={searchResult.length > 0 && showResult}
      onClickOutside={handleHideResult}
      interactive
    >
      <div className={cx('nav-search')}>
        <input
          ref={inputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={handleShowResult}
          placeholder="Search account and videos"
        />

        {!!searchText && (
          <button onClick={handleClear} className={cx('clear')}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        )}

        {/* <span className={cx('loading')}>
          <i className="fa-solid fa-spinner"></i>
        </span> */}

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
