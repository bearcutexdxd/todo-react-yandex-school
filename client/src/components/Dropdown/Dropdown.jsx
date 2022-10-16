/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';
import arrowImage from '../../assets/images/arrowDown.png';
import Tag from '../Tag/Tag';
import Checkbox from '../Checkbox/Checkbox';
import useToggle from '../../hooks/useToggle';

export default function Dropdown({ setValue, data }) {
  const tags = ['violet', 'green', 'red', 'orange', 'blue', 'light_green', 'dark_blue', 'yellow'];
  const initial = [];

  const reducer = (state, action) => {
    if (action.type === 'add') {
      if (state.indexOf(action.value) === -1) {
        return [...state, action.value];
      }
      return state.filter((el) => el !== action.value);
    }
  };

  const { value, toggle } = useToggle(false);
  const [values, dispatch] = useReducer(reducer, initial);

  function checkHandler(tag) {
    dispatch({ type: 'add', value: tag });
    setValue(values);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.top_container}>
        <p>Выбрать тег</p>
        <img src={arrowImage} alt="" onClick={toggle} />
      </div>
      {!!value && (
        <div className={styles.dropdown_content}>
          {tags?.map((tag) => (
            <div className={styles.option_container} key={uuidv4()}>
              <Tag color={tag} size="large" />
              <Checkbox tag={tag} checkHandler={checkHandler} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
