/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './styles.module.css';
import closeImage from '../../assets/images/close.png';

export default function Comment({
  author, text, edit, id, onClick,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <p>{author}</p>
        {edit && <img src={closeImage} alt="close" onClick={() => { onClick(id); }} />}
      </div>
      <p className={styles.comment}>{text}</p>
    </div>
  );
}
