const db = require('../../models/db');

module.exports = async ctx => {
  const body = ctx.request.body;

  if (+body.age) db.set('skills.age', body.age).write();
  if (+body.years) db.set('skills.years', body.years).write();
  if (+body.concerts) db.set('skills.concerts', body.concerts).write();
  if (+body.cities) db.set('skills.cities', body.cities).write();

  ctx.redirect(encodeURI('/admin?msgskill=Данные обновлены'));
};
