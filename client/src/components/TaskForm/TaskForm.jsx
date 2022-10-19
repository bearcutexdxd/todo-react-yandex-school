/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Tag from '../Tag/Tag';
import { fetchCurrentTicket } from '../../redux/slices/CurrentTicketSlice';
import { fetchTickets } from '../../redux/slices/TicketsSlice';
import { toggleError } from '../../redux/slices/ValidationSlice';

export default function TaskForm({
  modalType, id, edit, setEdit,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagsValues = useSelector((state) => state.tagsState);
  const currentTicket = useSelector((state) => state.currentTicket.currentTicket);
  const emptyInput = useSelector((state) => state.validation.emptyInput);

  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  const [idValue, setIdValue] = useState('');

  useEffect(() => {
    dispatch(fetchCurrentTicket(id));
    setIdValue(id);
    dispatch(toggleError(false));
  }, []);

  function submitHandler() {
    if (!input1Value || !input2Value) {
      dispatch(toggleError(true));
    } else {
      dispatch(toggleError(false));
      navigate('/');
    }
  }

  function addCommentHandler() {
    if (!input1Value || !input2Value) {
      dispatch(toggleError(true));
    } else {
      dispatch(toggleError(false));
      navigate(`/full/${id}`);
    }
  }

  async function createTicket(values) {
    const response = await fetch('http://localhost:3030/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, tagsValues, modalType }),
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchTickets());
    }
  }

  async function editTicket(values) {
    const response = await fetch(`http://localhost:3030/${idValue}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, tagsValues }),
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchTickets());
    }
  }

  async function editFullTicket(values) {
    if (!input1Value || !input2Value) {
      dispatch(toggleError(true));
      return;
    }
    const response = await fetch(`http://localhost:3030/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, tagsValues }),
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchCurrentTicket(id));
      setEdit(false);
    }
  }

  async function addComment(values) {
    const response = await fetch(`http://localhost:3030/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(fetchCurrentTicket(id));
    }
  }

  return (
    <form
      id="my-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (modalType === 'Todo' || modalType === 'In progress') {
          if (input1Value && input2Value) {
            createTicket({ task: input1Value, description: input2Value });
          }
        } else if (modalType === 'comment') {
          if (input1Value && input2Value) {
            addComment({ name: input1Value, comment: input2Value });
          }
        } else if (modalType === 'ticket') {
          editFullTicket({ task: input1Value, description: input2Value });
        } else if (input1Value && input2Value) {
          editTicket({ task: input1Value, description: input2Value });
        }
      }}
    >
      {(modalType === 'Todo' || modalType === 'In progress')
        && (
          <div className={styles.container}>
            <Input
              name="task"
              type="text"
              placeholder="Название"
              setInput={setInput1Value}
              valueInput={input1Value}
            />
            <Input name="description" type="text" input="textArea" placeholder="Описание" setInput={setInput2Value} valueInput={input2Value} />
            {emptyInput && <p className={styles.error}>field value can not be empty</p>}
            <Dropdown />
            <Button text="Сохранить" type="formSave" onClick={submitHandler} />
          </div>
        )}
      {modalType === 'edit'
        && (
          <div className={styles.container}>
            <Input name="task" type="text" placeholder={currentTicket.text} setInput={setInput1Value} textTicket={currentTicket.text} valueInput={input1Value} />
            <Input name="description" type="text" input="textArea" placeholder={currentTicket.description} setInput={setInput2Value} textTicket={currentTicket.description} valueInput={input2Value} />
            <div className={styles.tagsArray}>
              {Object.entries(tagsValues).filter((el) => Boolean(el[1])).map((el) => el[0])
                .map((tag) => (
                  <Tag color={tag} size="medium" key={uuidv4()} edit />
                ))}
            </div>
            {emptyInput && <p className={styles.error}>field value can not be empty</p>}
            <Dropdown currentTicket={currentTicket.tagsArray} />
            <Button text="Сохранить" type="formSave" onClick={submitHandler} />
          </div>
        )}
      {modalType === 'ticket' && edit && (
        <div className={styles.ticket_container}>
          <Input name="task" type="text" setInput={setInput1Value} textTicket={currentTicket.text} valueInput={input1Value} />
          <Input name="description" type="text" input="textArea" setInput={setInput2Value} textTicket={currentTicket.description} valueInput={input2Value} />
          {emptyInput && <p className={styles.error}>field value can not be empty</p>}
        </div>
      )}
      {modalType === 'ticket' && !edit && (
        <div className={styles.ticket_container}>
          <Input name="task" type="text" text={currentTicket.text} />
          <Input name="description" type="text" input="textArea" description={currentTicket.description} />
        </div>
      )}
      {modalType === 'comment' && (
        <div className={styles.container}>
          <Input
            name="task"
            type="text"
            placeholder="Имя"
            setInput={setInput1Value}
            valueInput={input1Value}
          />
          <Input name="description" type="text" placeholder="Комментарий" input="textArea" setInput={setInput2Value} valueInput={input2Value} />
          {emptyInput && <p className={styles.error}>field value can not be empty</p>}
          <Button
            text="Сохранить"
            type="formSave"
            onClick={addCommentHandler}
          />
        </div>
      )}
    </form>
  );
}
