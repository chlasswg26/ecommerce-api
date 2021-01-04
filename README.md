<p align="center" height='300'><a name="top" href="#octocat-hi-there-thanks-for-visiting-"><img width="300" src="https://i.ibb.co/QPDKFd4/Group-1158.png"></a></p>

<p align="center">
<a href="#rice_scene--setup"><img width="120px" style="padding: 0 10px;" src="https://i.ibb.co/b5DYRxb/setup.png"></a>
</p>

##  
### :octocat: Hi there! Thanks for visiting! <img alt="" align="right" src="https://badges.pufler.dev/visits/chlasswg26/ecommerce-api?style=flat-square&label=&color=success&logo=GitHub&logoColor=white&labelColor=373e4d"/>

<a href="https://github.com/expressjs/express"><img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" alt="expressjs/express" align="right" width="400px"></a>

This is my personal configuration for my favorite REST Api using ExpressJS and some package too.

I hope you understand everything here. :wink:

Here are some details about my setup:
- **Framework**                           : [ExpressJS](https://expressjs.com/en/starter/installing.html) :art: Fast, unopinionated, minimalist web framework for node!
- **Database**                           : [MySQL](https://github.com/mysqljs/mysql) :blossom: A pure node.js JavaScript Client implementing the MySQL protocol!
- **SMTP**                        : [Nodemailer](https://github.com/nodemailer/nodemailer) :shell: with [google](https://support.google.com/mail/answer/7126229?hl=en) service!
- **ORM**                     : [Sequelize](https://github.com/sequelize/sequelize) An easy-to-use multi SQL dialect ORM for Node.js!
- **Cache**                 : [Redis](https://github.com/NodeRedis/node-redis) A high performance Node.js Redis client!
- **File middleware**                        : [Multer](https://github.com/expressjs/multer) :shaved_ice: Node.js middleware for handling multipart form data!
- **Encryption**                   : [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) :doughnut: bcrypt for NodeJs!
- and many more (include `devDependencies`)
  
## :rice_scene:  Setup
This is how to install these repository for manual settings ExpressJS custom apps.


- First, you need to rename `env.example` to `.env`


## Requirements

* [`yarn`](https://yarnpkg.com/getting-started/install) or [`npm`](https://www.npmjs.com/)

## Optional setup

Open `.ENV` and replace with your config

```shell
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_TLS=

HOST=0.0.0.0
PORT=5000

SECRET_KEY=
REFRESH_SECRET_KEY=
TOKEN_LIFE=4h
REFRESH_TOKEN_LIFE=1d

SITE_NAME=
SERVICE_EMAIL=
CACHE_EXPIRY=120
MIN_FILE_UPLOAD=8
```

## Usage for development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/chlasswg26/ecommerce-api.git`
3. Open the folder and type `yarn install or npm install` for install dependencies
6. Type `yarn start` or `npm start` for run this app.
7. Well done..

## Postman collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/69e7aa999539ea14e9d7)


### Related Projects
This project is related to several platforms

* Frontend

## Available Scripts

In the project directory, you can run:

### `yarn start`

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

You will also see any lint errors in the console.

### `yarn test`

Middleware testing (experimental)
