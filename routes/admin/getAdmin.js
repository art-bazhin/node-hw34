const db = require('../../models/db');
const skills = db.get('skills').value();

module.exports = async ctx => {
  if (!ctx.session.isAdmin) {
    return ctx.redirect('/login');
  }

  return ctx.render('pages/admin',
    {
      ...skills,
      msgskill: ctx.query.msgskill,
      msgfile: ctx.query.msgfile
    });
};
