import React, { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';
import axios from 'axios';

const cx = className.bind(styles);

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const debounced = useDebounce(searchText, 500)
  
  const inputRef = useRef();



  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    const url = `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
      debounced,
    )}&type=less`;

    axios
      .get(url)
      .then((res) => {
        setSearchResult(res.data.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [debounced]);

  const handleClear = () => {
    setSearchText('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
    setSearchText('');
    setSearchResult([]);
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
            {searchResult.map((item) => (
              <AccountItem key={item.id} item={item} onClick={handleHideResult}/>
            ))}
          </PopperWrapper>
        </div>
      )}
      visible={searchResult.length > 0 && showResult}
      // onClickOutside={handleHideResult}
      interactive
      hideOnClick
    >
      <div className={cx('nav-search')}>
        <input
          ref={inputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={handleShowResult}
          placeholder="Search account and videos"
        />

        {!!searchText && !loading && (
          <button onClick={handleClear} className={cx('clear')}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        )}

        {loading && (
          <span className={cx('loading')}>
            <i className="fa-solid fa-spinner"></i>
          </span>
        )}

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
