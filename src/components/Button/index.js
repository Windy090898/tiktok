import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary,
  outline,
  small,
  large,
  disabled,
  round,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disabled) {
    Object.keys(props).forEach((propsKey) => {
      if (propsKey.startsWith('on') && typeof props[propsKey] === 'function') {
        delete props[propsKey];
      }
    });
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    small,
    large,
    disabled,
    round,
  });
  return (
    <Comp className={classes} {...props}>
      <span>{children}</span>
    </Comp>
  );
}

export default Button;
