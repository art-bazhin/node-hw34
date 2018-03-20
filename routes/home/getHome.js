const db = require('../../models/db');
const skills = db.get('skills').value();
const products = db.get('products').value();

module.exports = async ctx => {
  ctx.render('pages/index', { ...skills, products, msgemail: ctx.query.msg });
};
