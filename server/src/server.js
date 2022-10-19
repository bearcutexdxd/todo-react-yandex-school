/* eslint-disable max-len */
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { database } = require('./database');

const app = express();

const PORT = 3030;

app.use(cors({ credentials: true, origin: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.json(database);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.post('/', (req, res) => {
  const { tagsValues } = req.body;
  const { modalType } = req.body;
  const { task, description } = req.body.values;

  const newTicket = {
    id: uuidv4(),
    text: task,
    description,
    tagsArray: Object.entries(tagsValues).filter((el) => Boolean(el[1])).map((el) => el[0]),
    status: modalType,
    comments: [],
  };

  try {
    database.tickets.push(newTicket);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const currTicket = database.tickets.find((el) => el.id === id);
    res.json(currTicket);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.post('/:id', (req, res) => {
  const { name, comment } = req.body.values;

  try {
    const newTicket = database.tickets.find((el) => el.id === req.params.id);
    newTicket.comments.push({ author: name, text: comment });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.put('/:id', (req, res) => {
  const { tagsValues } = req.body;
  const { task, description } = req.body.values;

  const newTicket = database.tickets.find((el) => el.id === req.params.id);
  newTicket.text = task;
  newTicket.description = description;
  newTicket.tagsArray = Object.entries(tagsValues).filter((el) => Boolean(el[1])).map((el) => el[0]);

  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    database.tickets = database.tickets.filter((el) => el.id !== id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.put('/comment/:id', (req, res) => {
  const { commentId } = req.body;

  const newTicket = database.tickets.find((el) => el.id === req.params.id);
  newTicket.comments = newTicket.comments.filter((el) => el.id !== commentId);

  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.post('/drag/:id', (req, res) => {
  const { status } = req.body;

  const draggedTicket = database.tickets.find((el) => el.id === req.params.id);
  draggedTicket.status = status;

  try {
    res.json(database);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
