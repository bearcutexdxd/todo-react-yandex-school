/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import styles from './styles.module.css';

export default function Input({
  data, placeholder, input, text, description, ...props
}) {
  const [field, meta] = useField(props);

  if (text || description) {
    return input === 'textArea'
      ? <textarea {...field} {...props} placeholder={placeholder} className={styles.textArea} value={description} disabled="disabled" readOnly />
      : <input {...field} {...props} placeholder={placeholder} className={styles.input} value={text} disabled="disabled" readOnly />;
  }

  if (data) {
    return input === 'textArea'
      ? <textarea {...field} {...props} placeholder={placeholder} className={styles.textArea} value={field.value || data.description} />
      : <input {...field} {...props} placeholder={placeholder} className={styles.input} value={field.value || data.text} />;
  }

  return input === 'textArea'
    ? <textarea {...field} {...props} placeholder={placeholder} className={styles.textArea} />
    : <input {...field} {...props} placeholder={placeholder} className={styles.input} />;
}
