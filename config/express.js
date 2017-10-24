const express = require("express");
const session = require('express-session');
const errorHandler = require('errorhandler');
const mongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const helpers = require("view-helpers");
const bodyParser  = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

module.exports = (app, config, passport) => {
  app.set("showStackError", true);
  app.use(express.static(config.root + "/public"));
  app.use(morgan("dev")); // HTTP request logger middleware

  if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
    app.locals.pretty = true;
  }

  app.set("views", config.root + "/app/views");
  app.set("view engine", "pug");

  app.use(helpers(config.app.name));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride('_method'));
  app.use(
    session({
      secret: "noobjs",
      resave: false,
      saveUninitialized: false,
      store: new mongoStore({
        url: config.db,
        collection: "sessions"
      })
    })
  );

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((err, req, res, next) => {
    if (err.message.indexOf("not found") !== -1) {
      return next();
    }
    console.log(err.stack);

    res.status(500).render("pages/500", { error: err.stack });
  });
};
