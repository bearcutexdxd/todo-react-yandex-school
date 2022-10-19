/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/slices/TagSelectorSlice';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './styles.module.css';

export default function Modal({
  children, text, modal, noReset,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!noReset) { dispatch(reset()); }
  }, []);

  return (
    <ModalContainer>
      {modal === 'modal2' ? (
        <div className={styles.overlay}>
          <div className={styles.modal2}>
            <h3>{text}</h3>
            <div className={styles.flex}>
              {children[0]}
              {children[1]}
            </div>
          </div>
        </div>
      )
        : (
          <div className={styles.overlay}>
            <div className={styles.modal1}>
              <h3>{text}</h3>
              <div className={styles.image}>{children[0]}</div>
              {children[1]}
            </div>
          </div>
        )}
    </ModalContainer>
  );
}
