/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.css';
import { toggle } from '../../redux/slices/TagSelectorSlice';
import close from '../../assets/images/close.png';

export default function Tag({ color, size, edit }) {
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(toggle(color));
  }

  return (
    size === 'medium'
      ? (
        <div className={classNames(styles[color], styles[size])}>
          {edit && <img className={styles.image} src={close} alt="close" onClick={clickHandler} />}
        </div>
      )
      : <div className={classNames(styles[color], styles[size])} />
  );
}
