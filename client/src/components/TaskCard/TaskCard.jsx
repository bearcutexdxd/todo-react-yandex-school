/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import dotsImage from '../../assets/images/dots.png';
import taskTextImage from '../../assets/images/taskText.png';
import taskAlertImage from '../../assets/images/taskAlert.png';
import Tag from '../Tag/Tag';
import { fetchDraggedTicket } from '../../redux/slices/TicketsSlice';
import { setDragged } from '../../redux/slices/DraggedTaskSlice';

export default function TaskCard({
  text, tags, id, comments, description, task,
}) {
  const navigate = useNavigate();
  const draggedTask = useSelector((state) => state.draggedTask.draggedTask);
  const dispatch = useDispatch();

  function edit() {
    navigate(`/edit/${id}`);
  }

  function dragStartHandler(e) {
    dispatch(setDragged(task));
  }

  function dragEndHandler(e) {
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();

    switch (task.status) {
      case 'Todo':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status: task.status }));
        break;
      case 'In progress':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status: task.status }));
        break;
      case 'Done':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status: task.status }));
        break;
      default:
        break;
    }
  }

  return (
    <div
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e)}
      className={styles.container}
      onClick={edit}
    >
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
