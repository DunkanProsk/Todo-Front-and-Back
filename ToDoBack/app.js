const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

mongoose.connect('mongodb+srv://dunkan:taganrog123@cluster0-tanen.gcp.mongodb.net/ToDoList?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
