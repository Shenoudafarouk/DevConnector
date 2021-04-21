const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const app = express();

const db = require("./config/keys").mongoURI;
const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts')

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.use(morgan("dev"))
  app.use(express.urlencoded({
    extended: true
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


app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts',postsRoutes);

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
