const express = require('express');
const mongoose = require('mongoose');
const { usersRouters } = require('./routes/users.js');
const { cardsRouters } = require('./routes/cards.js');
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(usersRouters);

app.use(cardsRouters);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });

  await app.listen(PORT);
  // console.log(`Сервер запущен на ${PORT} порту`);
};

main();