/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import returnImage from '../../assets/images/arrowBack.png';
import dotsImage from '../../assets/images/dots.png';
import Tag from '../../components/Tag/Tag';
import Comment from '../../components/Comment/Comment';
import Button from '../../components/Button/Button';
import Popup from '../../components/Popup/Popup';
import useToggle from '../../hooks/useToggle';
import TaskForm from '../../components/TaskForm/TaskForm';
import Modal from '../../components/Modal/Modal';
import { fetchCurrentTicket } from '../../redux/slices/CurrentTicketSlice';
import { set } from '../../redux/slices/TagSelectorSlice';
import { fetchTickets } from '../../redux/slices/TicketsSlice';
import close from '../../assets/images/close.png';

export default function Ticket({ modal }) {
  const { id } = useParams();
  const [popup, setPopup] = useState(false);
  const [modalType, setModalType] = useState('');
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentTicket(id));
  }, [id]);

  const currentTicket = useSelector((state) => state.currentTicket.currentTicket);
  const tagsValues = useSelector((state) => state.tagsState);

  useEffect(() => {
    if (currentTicket?.tagsArray) {
      dispatch(set(currentTicket.tagsArray));
    }
  }, [currentTicket]);

  useEffect(() => {
    if (modal === true) {
      setEdit(true);
      setModalType('comment');
    } else {
      setModalType('');
      dispatch(fetchCurrentTicket(id));
    }
  }, [modal]);

  function clickHandler(e) {
    switch (e.target.textContent) {
      case 'Удалить':
        setModalType('delete');
        break;
      default:
        setEdit((value) => !value);
        break;
    }
    setPopup((value) => !value);
  }

  async function deleteComment(commentId) {
    const response = await fetch(`http://localhost:3030/comment/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId }),
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchCurrentTicket(id));
    }
  }

  async function deleteTicket() {
    const response = await fetch(`http://localhost:3030/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchTickets());
    }
  }

  return (
    <div className={styles.container}>
      {modalType === 'delete' && (
        <Modal text="Удалить тикет?" modal="modal2" noReset>
          <Link to="/">
            <Button text="Да" type="confirm" onClick={deleteTicket} />
          </Link>
          <Button text="Нет" type="confirm" onClick={() => setModalType('')} />
        </Modal>
      )}
      {modalType === 'comment' && (
        <Modal text="Добавить комментарий">
          <Link to={`/full/${id}`}>
            <img src={close} alt="" />
          </Link>
          <TaskForm
            modalType={modalType}
            id={id}
          />
        </Modal>
      )}
      <div className={styles.return}>
        <Link to="/">
          <img src={returnImage} alt="" />
        </Link>
        <p>Вернуться к задачам</p>
      </div>
      <div className={styles.taskType}>
        <h2>{currentTicket?.status}</h2>
        <div className={styles.popup_container}>
          <img src={dotsImage} alt="" onClick={() => { setPopup((value) => !value); }} />
          {popup && <Popup onClick={setPopup} clickHandler={clickHandler} />}
        </div>
      </div>
      <div className={styles.task_container}>
        <div className={styles.bottom_container}>
          <TaskForm
            modalType="ticket"
            edit={edit}
            id={id}
            setEdit={setEdit}
          />
          <div className={styles.tag_container}>
            {Object.entries(tagsValues).filter((el) => Boolean(el[1])).map((el) => el[0])
              .map((el) => (
                <Tag color={el} size="medium" key={uuidv4()} edit={edit} />
              ))}
          </div>
          {currentTicket?.comments && currentTicket?.comments.map((el) => (
            <Comment author={el.author} text={el.text} key={uuidv4()} edit={edit} onClick={deleteComment} id={el.id} />
          ))}
          {edit && <Button text="добавить комментарий" type="commentAdd" onClick={() => { navigate(`/full/${id}/comment/create`); }} />}
        </div>
        {edit && <Button text="Сохранить" type="taskSave" />}
      </div>
    </div>
  );
}
