const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const { usersRouters } = require('./routes/users');
const { cardsRouters } = require('./routes/cards');

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '63134b4a561e67c4d0f78891' };

  next();
});

app.use(usersRouters);

app.use(cardsRouters);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
