const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
let { database } = require('./database');

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

app.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const currTicket = database.tickets.find((el) => el.id === id);
    res.json(currTicket);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.post('/', (req, res) => {
  const { value } = req.body;
  const { task, description } = req.body.values;
  const newTicket = {
    id: uuidv4(),
    text: task,
    description,
    tagsArray: value,
    status: 'Todo',
    comments: [],
  };

  try {
    database.tickets.push(newTicket);
    res.json(database.tickets);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    database = database.tickets.filter((el) => el.id !== id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
