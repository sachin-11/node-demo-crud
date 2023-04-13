const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors')
const errorHandler = require('./middleware/error');

const morgan = require('morgan');
const connectDB = require('./config/db');

//load env vars

dotenv.config();

//Connect to database

connectDB();

//mount routes
const users = require('./routes/userRoutes');
const examples = require('./routes/exampleRoutes');
const tips = require('./routes/tipsroutes');
const questions = require('./routes/questionsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.get('/demo', (req, res) => {
  res.send('this is demo API for testing for serverless deployment...')
})

//mount routes
app.use('/api/v1/users', users);
app.use('/api/v1/tips', tips);
app.use('/api/v1/questions', questions);
app.use('/api/v1/examples', examples);
app.use('/api/v1/auth', authRoutes);

 const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server
  server.close(() => process.exit(1));
});
module.exports = server;