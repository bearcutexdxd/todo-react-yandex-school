/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import dotsImage from '../../assets/images/dots.png';
import taskTextImage from '../../assets/images/taskText.png';
import taskAlertImage from '../../assets/images/taskAlert.png';
import Tag from '../Tag/Tag';

export default function TaskCard({
  text, tags, id, comments, description,
}) {
  const navigate = useNavigate();

  function edit() {
    navigate(`/edit/${id}`);
  }

  return (
    <div className={styles.container} onClick={edit}>
      <div className={styles.top_container}>
        <p>{text}</p>
        <img src={dotsImage} alt="" onClick={(e) => { e.stopPropagation(); navigate(`/full/${id}`); }} />
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.tags_container}>
          {tags?.map((tag) => <Tag color={tag} size="small" key={uuidv4()} />)}
        </div>
        {!!description && <img src={taskAlertImage} alt="" />}
        {comments.length > 0 && <img src={taskTextImage} alt="" />}
      </div>
    </div>
  );
}
