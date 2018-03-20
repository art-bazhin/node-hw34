const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-morgan');
const body = require('koa-body');
const session = require('koa-session');
const serve = require('koa-static');
const Pug = require('koa-pug');

const pug = new Pug({ // eslint-disable-line no-unused-vars
  viewPath: './views',
  basedir: './views',
  app: app
});

const router = require('./routes');
const uploadDir = './public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.keys = ['secret'];

app.use(serve('public'));
app.use(logger('combined'));

app.use(body({
  multipart: true,
  formidable: {
    uploadDir: uploadDir,
    keepExtensions: true
  }
}));

app.use(session(app));
app.use(router.routes());

module.exports = app;
