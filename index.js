const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// middleware
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB instance');
  }
  catch (err) {
    console.log(err);
  }

  app.use('/user', require('./routes/user'))

  app.listen(5000, () => console.log('Server running on port 5000'));
}

start();


