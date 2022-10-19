/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import arrowImage from '../../assets/images/arrowDown.png';
import Tag from '../Tag/Tag';
import Checkbox from '../Checkbox/Checkbox';
import useToggle from '../../hooks/useToggle';
import { set } from '../../redux/slices/TagSelectorSlice';

export default function Dropdown({ currentTicket }) {
  const { value, toggle } = useToggle(false);

  const tagsValues = useSelector((state) => state.tagsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTicket) {
      dispatch(set(currentTicket));
    }
  }, [currentTicket]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.top_container}>
        <p>Выбрать тег</p>
        <img src={arrowImage} alt="" onClick={toggle} />
      </div>
      {!!value && (
        <div className={styles.dropdown_content}>
          {Object.keys(tagsValues)?.map((tag) => (
            <div className={styles.option_container} key={uuidv4()}>
              <Tag color={tag} size="large" />
              <Checkbox tag={tag} tagsValues={tagsValues} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
