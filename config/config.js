const path = require("path");
const rootPath = path.normalize(__dirname + "/..");
const DB = process.env.DB;


module.exports = {
  development: {
    db: "mongodb://localhost/ntwitter",
    root: rootPath,
    app: {
      name: "Node Twitter"
    }
  },
  production: {
    db: DB,
    root: rootPath,
    app: {
      name: "Nodejs Express Mongoose Demo"
    }
  }
};
