const mongoose = require('mongoose');

const TipsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Tips', TipsSchema);