const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db = require("./config/keys").mongoURI;
const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send({
    message: "Hello",
  });
});

app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts',postsRoutes);

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
