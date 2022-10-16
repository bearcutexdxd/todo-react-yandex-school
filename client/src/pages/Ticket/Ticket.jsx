/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';
import returnImage from '../../assets/images/arrowBack.png';
import dotsImage from '../../assets/images/dots.png';
import Input from '../../components/Input/Input';
import Tag from '../../components/Tag/Tag';
import Comment from '../../components/Comment/Comment';
import Button from '../../components/Button/Button';
import Popup from '../../components/Popup/Popup';
import useToggle from '../../hooks/useToggle';
import TaskForm from '../../components/TaskForm/TaskForm';
import Modal from '../../components/Modal/Modal';

export default function Ticket() {
  const { id } = useParams();
  const { value, toggle } = useToggle(false);
  const [ticketInfo, setTicketInfo] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3030/${id}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTicketInfo(data);
      }
    }

    fetchData();
  }, []);

  const popupObj = useToggle(false);
  const modalObj = useToggle(false);

  const popup = popupObj.value;
  const popupToggle = popupObj.toggle;
  const modal = modalObj.value;
  const modalToggle = modalObj.toggle;

  const [modalType, setModalType] = useState('');

  function clickHandler(e) {
    switch (e.target.textContent) {
      case 'Удалить':
        setModalType('delete');
        break;
      default:
        setModalType('create');
        break;
    }
    modalToggle();
    popupToggle();
  }

  return (
    <div className={styles.container}>
      {modalType !== 'create' && modal && (
        <Modal text="Удалить тикет?">
          <Button text="Да" type="confirm" onClick={modalToggle} />
          <Button text="Нет" type="confirm" onClick={modalToggle} />
        </Modal>
      )}
      <div className={styles.return}>
        <Link to="/">
          <img src={returnImage} alt="" />
        </Link>
        <p>Вернуться к задачам</p>
      </div>
      <div className={styles.taskType}>
        <h2>{ticketInfo?.status}</h2>
        <div className={styles.popup_container}>
          <img src={dotsImage} alt="" onClick={toggle} />
          {popup && <Popup onClick={popupToggle} clickHandler={clickHandler} />}
        </div>
      </div>
      <div className={styles.task_container}>
        <div className={styles.bottom_container}>
          <TaskForm modalType="ticket" text={ticketInfo?.text} description={ticketInfo?.description} />
          <div className={styles.tag_container}>
            {ticketInfo?.tagsArray.map((el) => <Tag color={el} size="medium" key={uuidv4()} />)}
          </div>
          {ticketInfo?.comments.map((el) => <Comment author={el.author} text={el.text} key={uuidv4()} />)}
          <Button text="добавить комментарий" type="commentAdd" />
        </div>
        <Button text="Сохранить" type="taskSave" />
      </div>
    </div>
  );
}
