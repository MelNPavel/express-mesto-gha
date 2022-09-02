const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: [{
    type: String,
  }],
  createdAt:{
    type: Date,

  }
});

module.exports = mongoose.model('Card', cardSchema);