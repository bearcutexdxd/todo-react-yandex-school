import React from 'react';
import styles from './styles.module.css';
import useToggle from '../../hooks/useToggle';

export default function Checkbox({ text, checkHandler, tag }) {
  const { value, toggle } = useToggle(false);

  function clickHandle() {
    toggle();
    checkHandler(tag);
  }

  return (
    <div className={styles.container}>
      <label>
        <input type="checkbox" checked={value} onChange={() => clickHandle()} />
        <span />
      </label>
      {!!text && <p>{text}</p>}
    </div>
  );
}
