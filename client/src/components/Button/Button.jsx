/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './styles.module.css';

export default function Button({ text, type, onClick }) {
  return (
    <button className={styles[type]} onClick={onClick}>{text}</button>
  );
}
