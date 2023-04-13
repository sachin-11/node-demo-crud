const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  password: {
    type: String
  },
  image: {
    type: String,
  },
  gender: {
    type: String,
  },
  experience: {
    type: String,
  },
  department: {
    type: String,
  },
  technical_skills: {
    type: Array,
  },
  learning_skills: {
    type: Array,
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

//Encrypt password using bcrypt
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema);