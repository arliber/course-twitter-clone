# Node Twitter


Node twitter was an effort to rewrite some of Twitter's functionality using modern
javascript based toolchain made by [Vinit Kumar](https://avatars0.githubusercontent.com/u/537678?v=3&s=144) and [Robert Cooper](https://avatars0.githubusercontent.com/u/16786990?v=3&s=144).
Adopted for personal usage in my course [Arik Liber](github.com/LeonLiber/).

[Original version](https://github.com/vinitkumar/node-twitter) and [another nice implementation](https://github.com/tatsuyaoiw/twitter)


## Prerequisites

You are required to have Node.js and MongoDB installed if you'd like to run the app locally.

- [Node.js](http://nodejs.org)
- [Mongodb](http://docs.mongodb.org/manual/installation/)


The configuration is in `config/config.js`. Please create your own
github application [Github Developer Settings](https://github.com/settings/applications) and replace the token and keys.

```js
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
module.exports = {
  production: {
    db: '',
    root: rootPath,
    app: {
      name: 'Node Twitter'
    },
    github: {
      clientID: '',
      clientSecret: '',
      callbackURL: ''
    }
  }
};
```

## Usage

1. Run `npm install`
2. Now run `npm start`

## License
[GPL-3.0](https://github.com/vinitkumar/node-twitter/blob/master/License)

## Important

Twitter is a registered trademark of Twitter Inc. This project is just for learning purposes and should be treated as such.
