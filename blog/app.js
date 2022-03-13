require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const createError = require('http-errors');

// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth');

var passportRouter = require('./routes/passport');

var registerRouter = require('./routes/register');

var postRouter = require('./routes/posts');

var commentsRouter = require('./routes/comments');


var app = express();

require('./passport');


// app.use((req, res, next) => {
//     console.log('Time is : ', Date.now());


//     next();
// });

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.use('/api/auth', authRouter);

app.use('/api/passport', passportRouter);

app.use('/api/register', registerRouter);

app.use('/api/posts', postRouter);

app.use('/api/comments', commentsRouter);



app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    if (err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError') {
        err.status = 422;
    }
    res.status(err.status || 500).json({ message: err.message || "Some Error Occurred." });
});

/*
MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    console.log('connected successfuly...');
    db.close();

});
*/
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log('connected successfuly...');
});



module.exports = app;