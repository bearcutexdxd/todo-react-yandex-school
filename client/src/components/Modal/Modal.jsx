/* eslint-disable no-shadow */
import React, { useMemo } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './styles.module.css';

export default function Modal({ children, text }) {
  const childrenObj = (function createChildrenObj(children) {
    const result = {};

    children.forEach((el) => {
      if (el.type.name) {
        if (!result[el.type.name]) result[el.type.name] = [el];
        else result[el.type.name].push(el);
      } else {
        result[el.type] = el;
      }
    });

    return result;
  }(children));

  return (
    <ModalContainer>
      <div className={styles.overlay}>
        <div className={styles.modal1}>
          <h3>{text}</h3>
          <div className={styles.image}>{children[0]}</div>
          {children[1]}
        </div>
      </div>
    </ModalContainer>
  );
}
