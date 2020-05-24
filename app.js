var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movie')
var theatreRouter = require('./routes/theatre')
var showRouter = require('./routes/show')
var showJoin = require('./routes/showJoin')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const server = '127.0.0.1:27017';
const mongoose = require("mongoose");
const database = "sitanshu";
var mongoDB = 'mongodb://127.0.0.1/sitanshu';
//let mongoDB = "mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/ecommerce-app?retryWrites=true&w=majority" || "mongodb://localhost:27017/eagle-ecommerce";
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
let db = mongoose.connection;
db.once("open", function () {
  console.log("connected to mongodb");
});
//check for DB errors
db.on("error", function (err) {
  console.log(err);
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', movieRouter);
app.use('/theatres', theatreRouter);
app.use('/shows', showRouter);
app.use('/showsBy', showJoin);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app
  .listen(PORT, HOST, function () {
    console.log("Started : ", PORT);
  })
  .on("error", function (err) {
    console.log("Unable To Start App >>>", err);
  });

module.exports = app;
