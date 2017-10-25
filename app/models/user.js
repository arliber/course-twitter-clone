const mongoose = require("mongoose");
const Tweet = mongoose.model("Tweet");
const Schema = mongoose.Schema;
const crypto = require("crypto");
gravatar = require('gravatar');

// Define UserSchema
const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  hashedPassword: String,
  salt: String,
  followers: [{ type: Schema.ObjectId, ref: "User" }],
  following: [{ type: Schema.ObjectId, ref: "User" }],
  tweets: Number
});

UserSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.virtual("profilePicture")
  .get(function () {
    return gravatar.url(this.email ? this.email.toLowerCase() : 'none', { s: '200' });
  });

UserSchema.path("name").validate(function(name) {
  return name.length;
}, "Name cannot be blank");

UserSchema.path("email").validate(function(email) {
  return email.length;
}, "Email cannot be blank");

UserSchema.path("username").validate(function(username) {
  return username.length;
}, "username cannot be blank");

UserSchema.path("hashedPassword").validate(function(hashedPassword) {
  return hashedPassword.length;
}, "Password cannot be blank");

UserSchema.pre("save", function(next) {
  if (!this.password || !this.password.length) {
    next(new Error("Invalid password"));
  } else {
    next();
  }
});

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function() {
    return String(Math.round(new Date().valueOf() * Math.random()));
  },

  encryptPassword: function(password) {
    if (!password) {
      return "";
    }
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
  }
};

UserSchema.statics = {
  addfollow: function(id, cb) {
    this.findOne({ _id: id }).populate("followers").exec(cb);
  },
  countUserTweets:  function (id, cb) {
    return Tweet.find({ user: id }).count().exec(cb);
  },
  load: function(options, cb) {
    options.select = options.select || "name username email profilePicture";
    return this.findOne(options.criteria).select(options.select).exec(cb);
  },
  list: function(options) {
    const criteria = options.criteria || {};
    return this.find(criteria)
      .populate("user", "name username")
      .limit(options.perPage)
      .skip(options.perPage * options.page);
  }
};

mongoose.model("User", UserSchema);
