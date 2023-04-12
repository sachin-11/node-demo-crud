const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a Question'],
  },
  answer: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: false
  },
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionsSchema);