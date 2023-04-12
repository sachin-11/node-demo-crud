const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a Title'],
  },
  description: {
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

module.exports = mongoose.model('Examples', ExampleSchema);