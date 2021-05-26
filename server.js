const createError = require('http-errors');
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const passport = require('passport')
const app = express();
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts')

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//"mongodb+srv://shenoudafarouk:12345@cluster0.njwge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"))
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
 
  // render the error page
  res.status(err.status || 500).json({
    status: 'BAD_REQUEST',
    message: err.message
  });
  console.log(err)
});

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
