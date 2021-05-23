const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_Key;

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(opts, async (JWT_payload, done) => {
      
      const user = await User.findById(JWT_payload.userId);

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
