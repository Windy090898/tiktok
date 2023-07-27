import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames/bind'
import styles from './SuggestAccs.module.scss'

import AccountItem from './AccountItem'
import { Link } from 'react-router-dom'
import config from '~/config'

const cx = classNames.bind(styles)

function SuggestAccs({ label, preview, accounts }) {
  
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      <div className={cx('account-list')}>
        {accounts.map((account) => (
          <AccountItem key={account.id} preview={preview} item={account} />
        ))}
      </div>
      <Link className={cx('more')} to={config.routes.suggest}>See all</Link>
    </div>
  );
}

SuggestAccs.propTypes = {
  label: PropTypes.string.isRequired,
  preview: PropTypes.bool,
  accounts: PropTypes.array.isRequired,
}

export default SuggestAccs