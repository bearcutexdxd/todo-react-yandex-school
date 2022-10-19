/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Modal from '../../components/Modal/Modal';
import TaskCard from '../../components/TaskCard/TaskCard';
import useToggle from '../../hooks/useToggle';
import styles from './styles.module.css';
import closeImage from '../../assets/images/close.png';
import TaskForm from '../../components/TaskForm/TaskForm';
import { fetchTickets, filterTickets, fetchDraggedTicket } from '../../redux/slices/TicketsSlice';

export default function Main({ modal }) {
  const { value, toggle } = useToggle(false);
  const [modalType, setModalType] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.tickets.filters);
  const draggedTask = useSelector((state) => state.draggedTask.draggedTask);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  useEffect(() => {
    dispatch(filterTickets(filters));
  }, [filters]);

  useEffect(() => {
    if (modal && modal !== 'close') {
      setModalType(modal);
      toggle();
    } else if (modal === 'close') {
      if (value) {
        toggle();
      }
    }
  }, [modal]);

  function dragStartHandler(e) {
  }

  function dragEndHandler(e) {
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e, status) {
    e.preventDefault();
    switch (status) {
      case 'Todo':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status }));
        break;
      case 'In progress':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status }));
        break;
      case 'Done':
        dispatch(fetchDraggedTicket({ id: draggedTask.id, status }));
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      {(modalType === 'Todo' || modalType === 'In progress') && value && (
        <Modal text="Создать тикет">
          <Link to="/"><img src={closeImage} alt="" onClick={toggle} /></Link>
          <TaskForm modalType={modalType} onClick={toggle} id={id} />
        </Modal>
      )}

      {modalType === 'edit' && value && (
        <Modal text="Редактировать">
          <Link to="/"><img src={closeImage} alt="" onClick={toggle} /></Link>
          <TaskForm modalType={modalType} onClick={toggle} id={id} />
        </Modal>
      )}

      <div className={styles.filter}>
        <Checkbox text="Комментарий" filter="comments" />
        <Checkbox text="Описание" filter="description" />
        <Checkbox text="Тег" filter="tag" />
      </div>
      <div className={styles.task_container}>
        <div>
          <h2>Todo</h2>
          <div
            className={styles.todo_container}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, 'Todo')}
          >
            {tickets?.tickets.filter((el) => el.status === 'Todo').map((task) => (
              <TaskCard
                task={task}
                text={task.text}
                tags={task.tagsArray}
                key={task.id}
                id={task.id}
                comments={task.comments}
                description={task.description}
              />
            ))}
            <Link to="/create/todo"><Button text="+ Добавить тикет" type="addTicket" /></Link>
          </div>
        </div>
        <div>
          <h2>In progress</h2>
          <div
            className={styles.progress_container}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, 'In progress')}
          >
            {tickets?.tickets.filter((el) => el.status === 'In progress').map((task) => (
              <TaskCard
                task={task}
                text={task.text}
                tags={task.tagsArray}
                key={task.id}
                id={task.id}
                comments={task.comments}
                description={task.description}
              />
            ))}
            <Link to="/create/in_progress"><Button text="+ Добавить тикет" type="addTicket" /></Link>
          </div>
        </div>
        <div>
          <h2>Done</h2>
          <div
            className={styles.done_container}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, 'Done')}
          >
            {tickets?.tickets.filter((el) => el.status === 'Done').map((task) => (
              <TaskCard
                task={task}
                text={task.text}
                tags={task.tagsArray}
                key={task.id}
                id={task.id}
                comments={task.comments}
                description={task.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
