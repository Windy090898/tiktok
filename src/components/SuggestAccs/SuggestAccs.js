import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind'
import styles from './SuggestAccs.module.scss'

import AccountItem from './AccountItem'
import config from '~/config'

const cx = classNames.bind(styles)

function SuggestAccs({ label, preview, type, renderArr }) {
  
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      <div className={cx('account-list')}>
        {renderArr.map((account) => (
          <AccountItem
            key={account.id}
            preview={preview}
            item={account}
          />
        ))}
      </div>
      <Link className={cx('more')} to={config.routes.suggest}>
        See all
      </Link>
    </div>
  );
}

SuggestAccs.propTypes = {
  label: PropTypes.string.isRequired,
  preview: PropTypes.bool,
}

export default SuggestAccs