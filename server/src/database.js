const { v4: uuidv4 } = require('uuid');

const database = {
  tagsArray: ['violet', 'green', 'red', 'orange', 'blue', 'light_green', 'dark_blue', 'yellow'],
  tickets: [
    {
      id: uuidv4(),
      text: 'Нарисовать иллюстрации',
      description: 'Очень длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание',
      tagsArray: ['violet', 'green', 'red', 'orange', 'blue', 'light_green', 'dark_blue', 'yellow'],
      status: 'Todo',
      comments: [
        {
          author: 'Иван Иванов',
          text: 'Очень длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий',
        },
        {
          author: 'Иван Иванов',
          text: 'Очень длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий',
        },
        {
          author: 'Иван Иванов',
          text: 'Очень длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий',
        },
      ],
    },
    {
      id: uuidv4(),
      text: 'здесь нет описания',
      description: '',
      tagsArray: ['violet', 'green', 'red'],
      status: 'Todo',
      comments: [
        {
          author: 'Иван Иванов',
          text: 'Очень длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий длинный комментарий',
        },
      ],
    },
    {
      id: uuidv4(),
      text: 'сделать что-то',
      description: '',
      tagsArray: ['violet', 'green', 'red', 'orange', 'blue', 'light_green', 'dark_blue', 'yellow'],
      status: 'In progress',
      comments: [],
    },
    {
      id: uuidv4(),
      text: 'привет',
      description: 'Очень длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание длинное описание',
      tagsArray: ['violet', 'green', 'blue', 'light_green', 'dark_blue', 'yellow'],
      status: 'Done',
      comments: [],
    },
  ],
};

module.exports = { database };
