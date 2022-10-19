/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { React, useEffect } from 'react';
import styles from './styles.module.css';

export default function Input({
  placeholder, input, text, description, setInput,
  valueInput,
  textTicket,
}) {
  useEffect(() => {
    if (setInput) setInput(textTicket);
  }, [textTicket]);

  if (text || description) {
    return input === 'textArea'
      ? <textarea placeholder={placeholder} className={styles.textArea} value={description} disabled="disabled" readOnly />
      : <input placeholder={placeholder} className={styles.input} value={text} disabled="disabled" readOnly />;
  }

  return input === 'textArea'
    ? (
      <textarea
        placeholder={placeholder}
        value={valueInput}
        onChange={(e) => setInput(e.target.value)}
        className={styles.textArea}
      />
    )
    : (
      <input
        placeholder={placeholder}
        value={valueInput}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
    );
}
