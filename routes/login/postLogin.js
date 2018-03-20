const db = require('../../models/db');
const admin = db.get('admin').value();

module.exports = async ctx => {
  let body = ctx.request.body;

  if (body.email === admin.email && body.password === admin.password) {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  } else {
    ctx.redirect(encodeURI('/login?msg=Неправильно введен e-mail или пароль!'));
  }
};
