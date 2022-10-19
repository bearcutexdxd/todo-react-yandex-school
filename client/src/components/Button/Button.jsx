/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './styles.module.css';

export default function Button({ text, type, onClick }) {
  if (type === 'taskSave') {
    return (
      <button
        onClick={onClick}
        type="submit"
        form="my-form"
        className={styles.taskSave}
      >
        {text}
      </button>
    );
  }
  return (
    <button className={styles[type]} onClick={onClick}>{text}</button>
  );
}
