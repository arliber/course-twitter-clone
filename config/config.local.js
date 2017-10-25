const path = require("path"),
  rootPath = path.normalize(__dirname + "/..");

module.exports = {
  development: {
    db: "mongodb://localhost/ntw2",
    root: rootPath,
    app: {
      name: "Node Twitter"
    }
  },
  production: {
    db: "mongodb://localhost/noobjs_prodd",
    root: rootPath,
    app: {
      name: "Nodejs Express Mongoose Demo"
    }
  }
};
