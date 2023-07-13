import React from 'react'
import Button from '~/components/Button'
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx('menu-item', { separate: data.separate });
  return (
    <Button onClick={onClick} to={data.to} className={classes} large>
      <span>{data.icon}</span>
      {data.title}
    </Button>
  );
}

export default MenuItem