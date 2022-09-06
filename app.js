const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const { usersRouters } = require('./routes/users');
const { cardsRouters } = require('./routes/cards');

const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '63134b4a561e67c4d0f78891' };

  next();
});

app.use(usersRouters);

app.use(cardsRouters);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Такой страницы нет' });
});

async function main(req, res) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
}

main();
