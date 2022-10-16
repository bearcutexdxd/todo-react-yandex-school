import React from 'react';
import styles from './styles.module.css';
import closeImage from '../../assets/images/close.png';

export default function Comment({ author, text }) {
  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <p>{author}</p>
        <img src={closeImage} alt="" />
      </div>
      <p className={styles.comment}>{text}</p>
    </div>
  );
}
