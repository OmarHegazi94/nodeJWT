const express = require('express');
const mongoose = require('mongoose');

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

// connecting the db
mongoose.connect("mongodb://localhost:27017/tokenDemo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connected");
  }).catch(error => {
    console.log(error);
  });

app.use(cors(
  {
    origin: 'http://localhost:4200'
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// server listening
const port = process.env.port || 8080;
app.listen(port, () => {
  console.log("Server is listening ...");
});


// module.exports = app;
