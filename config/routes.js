module.exports = (app, passport, auth) => {
  const users = require("../app/controllers/users");
  const chat = require('../app/controllers/chat');
  const analytics = require("../app/controllers/analytics");
  const tweets = require("../app/controllers/tweets");
  const comments = require("../app/controllers/comments");
  const favorites = require("../app/controllers/favorites");
  const follows = require("../app/controllers/follows");

  /**
   * Home
   */
  app.get("/", auth.requiresLogin, tweets.index);

  /**
   * Authentication routes
   */
  app.get("/login", users.loginPage);
  app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), users.loginDone);
  
  app.get("/signup", users.signupPage);
  app.post("/signup", users.signupAction);
  
  app.get("/logout", users.logout);

  /**
   * User routes
   */
  app.get("/users/:userId", users.show);
  app.get("/users/:userId/followers", users.showFollowers);
  app.get("/users/:userId/following", users.showFollowing);
  //app.post("/users", users.create); // TODO: WTF?
  app.post(
    "/users/sessions",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid email or password"
    }),
    users.session
  );
  app.post("/users/:userId/follow", auth.requiresLogin, follows.follow);
  app.param("userId", users.user);

  
exports.logout = (req, res) => {
  logAnalytics(req);
  req.logout();
  res.redirect("/login");
};

exports.session = (req, res) => {
  res.redirect("/");
};

  /**
   * Chat routes
   */
  app.get('/chat', auth.requiresLogin, chat.index);
  app.get('/chat/:id', auth.requiresLogin, chat.show);
  app.get('/chat/get/:userid', auth.requiresLogin, chat.getChat);
  app.post('/chats', auth.requiresLogin, chat.create);
  
  /**
  * Analytics routes
  */
  app.get("/analytics", analytics.index);

  /**
   * Tweet routes
   */
  app.route("/tweets")
    .get(tweets.index)
    .post(auth.requiresLogin, tweets.create)

  app.route("/tweets/:id")
    .post(auth.requiresLogin, auth.tweet.hasAuthorization, tweets.update)
    .delete(auth.requiresLogin, auth.tweet.hasAuthorization, tweets.destroy)

  app.param("id", tweets.tweet);

  /**
   * Comment routes
   */
  app.route("/tweets/:id/comments")
    .get(auth.requiresLogin, comments.create)
    .post(auth.requiresLogin, comments.create)
    .delete(auth.requiresLogin, comments.destroy)

  /**
   * Favorite routes
   */
  app.route("/tweets/:id/favorites")
    .post(auth.requiresLogin, favorites.create)
    .delete(auth.requiresLogin, favorites.destroy)

  /**
   * Page not found route (must be at the end of all routes)
   */
  app.use((req, res) => {
    res.status(404).render("pages/404", {
      url: req.originalUrl,
      error: "Not found"
    });
  });
};
