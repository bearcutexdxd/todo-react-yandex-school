/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './styles.module.css';
import close from '../../assets/images/close.png';

export default function Popup({ onClick, clickHandler }) {
  return (
    <div className={styles.popup_container}>
      <div className={styles.test}>
        <p onClick={clickHandler}>Удалить</p>
        <img src={close} alt="" onClick={() => { onClick((value) => !value); }} />
      </div>
      <p onClick={clickHandler}>Редактировать</p>
    </div>
  );
}
