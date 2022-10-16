/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Comment from '../../components/Comment/Comment';
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import TaskCard from '../../components/TaskCard/TaskCard';
import useToggle from '../../hooks/useToggle';
import styles from './styles.module.css';
import closeImage from '../../assets/images/close.png';
import TaskForm from '../../components/TaskForm/TaskForm';

export default function Main({ modal }) {
  const { value, toggle } = useToggle(false);
  const [modalType, setModalType] = useState('');
  const [tickets, setTickets] = useState([]);
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState({});

  const [filterComments, setFilterComments] = useState(false);
  const [filterDescription, setFilterDescription] = useState(false);
  const [filterTag, setFilterTag] = useState(false);

  function clickHandler(e) {
    // console.log(e.target);
    switch (e.target.textContent) {
      case '+ Добавить тикет':
        setModalType('create');
        break;
      default:
        setModalType('delete');
        break;
    }
    toggle();
  }

  async function fetchTicket() {
    const response = await fetch(`http://localhost:3030/${id}`, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setTicketInfo(data);
    }
  }

  useEffect(() => {
    if (modal && modal !== 'close') {
      if (id) {
        fetchTicket();
      }
      setModalType(modal);
      toggle();
    } else if (modal === 'close') {
      if (value) {
        toggle();
      }
    }
  }, [modal]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3030/', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets);
        setTags(data.tagsArray);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {modalType === 'create' && value && (
        <Modal text="Создать тикет">
          <Link to="/"><img src={closeImage} alt="" onClick={toggle} /></Link>
          <TaskForm modalType={modalType} onClick={toggle} setTickets={setTickets} />
        </Modal>
      )}

      {modalType === 'edit' && value && (
        <Modal text="Редактировать" tagsArray={tags.tagsArray}>
          <Link to="/"><img src={closeImage} alt="" onClick={toggle} /></Link>
          <TaskForm modalType={modalType} onClick={toggle} data={ticketInfo} setTickets={setTickets} />
        </Modal>
      )}

      <div className={styles.filter}>
        <Checkbox text="Комментарий" filter={setFilterComments} />
        <Checkbox text="Описание" filter={setFilterDescription} />
        <Checkbox text="Тег" filter={setFilterTag} />
      </div>
      <div className={styles.task_container}>
        <div>
          <h2>Todo</h2>
          <div className={styles.todo_container}>
            {tickets?.filter((el) => el.status === 'Todo').map((task) => <TaskCard text={task.text} tags={task.tagsArray} key={task.id} id={task.id} comments={task.comments} description={task.description} />)}
            <Link to="/create"><Button text="+ Добавить тикет" type="addTicket" /></Link>
          </div>
        </div>
        <div>
          <h2>In progress</h2>
          <div className={styles.progress_container}>
            {tickets?.filter((el) => el.status === 'In progress').map((task) => <TaskCard text={task.text} tags={task.tagsArray} key={task.id} id={task.id} comments={task.comments} description={task.description} />)}
            <Link to="/create"><Button text="+ Добавить тикет" type="addTicket" /></Link>
          </div>
        </div>
        <div>
          <h2>Done</h2>
          <div className={styles.done_container}>
            {tickets?.filter((el) => el.status === 'Done').map((task) => <TaskCard text={task.text} tags={task.tagsArray} key={task.id} id={task.id} comments={task.comments} description={task.description} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
