/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './styles.module.css';
import close from '../../assets/images/close.png';

export default function Popup({ onClick }) {
  return (
    <div className={styles.popup_container}>
      <div className={styles.test}>
        <p>Удалить</p>
        <img src={close} alt="" onClick={onClick} />
      </div>
      <p>Редактировать</p>
    </div>
  );
}
