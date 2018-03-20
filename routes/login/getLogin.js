module.exports = async ctx => {
  ctx.render('pages/login', { msglogin: ctx.query.msg });
};