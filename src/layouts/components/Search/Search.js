import React, { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import className from 'classnames/bind';
import styles from './Search.module.scss';

import * as searchServices from '~/services/searchServices';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';

const cx = className.bind(styles);

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchText, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };

    fetchApi();
  }, [debounced]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(' ')) {
      return;
    }
    setSearchText(searchValue);
  };

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

  const handleClearResult = () => {
    setShowResult(false);
    setSearchText('');
    setSearchResult([]);
  };
  return (
    // Using a wrapper <div> tag around the reference element solves Tippy problems by creating a new parentNode context
    <div>
      <HeadlessTippy
        interactive
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-label')}>Accounts</h4>
              {searchResult.map((item) => (
                <AccountItem
                  key={item.id}
                  item={item}
                  onClick={handleClearResult}
                />
              ))}
            </PopperWrapper>
          </div>
        )}
        visible={searchResult.length > 0 && showResult}
        onClickOutside={handleHideResult}
        // hideOnClick
      >
        <div className={cx('nav-search')}>
          <input
            ref={inputRef}
            value={searchText}
            onChange={handleChange}
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
    </div>
  );
}

export default Search;
