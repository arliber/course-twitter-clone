const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model("User");

module.exports = (passport, config) => {

  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });

  // use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Unknown user" });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        });
      }
    )
  );

};
