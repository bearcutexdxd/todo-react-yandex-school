/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Tag from '../Tag/Tag';

export default function TaskForm({
  modalType, text, description, onClick, data, setTickets,
}) {
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  function submit(type) {
    switch (type) {
      case 'create':
        navigate('/');
        break;
      case 'edit':
        navigate('/');
        break;
      default:
        break;
    }
  }

  useEffect(() => { }, [modalType]);

  async function createTicket(values) {
    const response = await fetch('http://localhost:3030/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values, value }),
      credentials: 'include',
    });

    if (response.ok) {
      const tickets = await response.json();
      setTickets(tickets);
    }
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { resetForm }) => {
        createTicket(values);
        resetForm();
      }}
    >
      <Form>
        {modalType === 'create'
          && (
            <div className={styles.container}>
              <Input name="task" type="text" placeholder="Название" />
              <Input name="description" type="text" input="textArea" placeholder="Описание" />
              <Dropdown setValue={setValue} />
              <Button text="Сохранить" type="formSave" onClick={() => { submit('create'); }} />
            </div>
          )}
        {modalType === 'edit'
          && (
            <div className={styles.container}>
              <Input name="task" type="text" placeholder="" data={data} />
              <Input name="description" type="text" input="textArea" placeholder="" data={data} />
              <div className={styles.tagsArray}>
                {data?.tagsArray?.map((el) => <Tag color={el} size="medium" key={uuidv4()} />)}
              </div>
              <Dropdown setValue={setValue} />
              <Button text="Сохранить" type="formSave" onClick={() => submit('edit')} />
            </div>
          )}
        {modalType === 'ticket'
          && (
            <div className={styles.ticket_container}>
              <Input text={text} name="task" type="text" />
              <Input description={description} name="description" input="textArea" type="text" />
            </div>
          )}

      </Form>
    </Formik>
  );
}
