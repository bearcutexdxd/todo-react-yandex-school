import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

export default function Tag({ color, size }) {
  return (
    <div className={classnames(styles[color], styles[size])} />
  );
}
