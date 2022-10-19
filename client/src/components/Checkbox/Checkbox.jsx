/* eslint-disable no-unused-expressions */
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { toggle } from '../../redux/slices/TagSelectorSlice';
import { toggleFilters } from '../../redux/slices/TicketsSlice';

export default function Checkbox({
  text, tag, filter, tagsValues = [],
}) {
  const dispatch = useDispatch();

  function onChangeHandler() {
    if (filter) {
      dispatch(toggleFilters(filter));
    } else dispatch(toggle(tag));
  }

  return (
    <div className={styles.container}>
      <label>
        <input type="checkbox" checked={tagsValues[tag]} onChange={onChangeHandler} />
        <span />
      </label>
      {!!text && <p>{text}</p>}
    </div>
  );
}
