const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'Please add a image'],
  },
  gender: {
    type: String,
    required: [true, 'Please add a gender'],
  },
  experience: {
    type: String,
    required: [true, 'Please add a Experience'],
  },
  department: {
    type: String,
    required: [true, 'Please add a Department'],
  },
  technical_skills: {
    type: Array,
    required: [true, 'Please add a least one technical skills'],
  },
  learning_skills: {
    type: Array,
    required: [true, 'Please add a learning skills'],
  },
  rating: {
    type: String,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  },
}, {
    timestamps: true
});

// //Encrypt password using bcrypt

// UserSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// //sign  jwt and return

// UserSchema.methods.getSignJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// //match user entered password to hash password in database

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', UserSchema);