const nodemailer = require('nodemailer');
const mailerConfig = require('../../mailer.json');

module.exports = async ctx => {
  if (!ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.message) {
    return ctx.redirect(encodeURI('/?msg=Все поля нужно заполнить!'));
  }

  const transporter = nodemailer.createTransport(mailerConfig.mail.smtp);
  const mailOptions = {
    from: `"${ctx.request.body.name}" <${ctx.request.body.email}>`,
    to: mailerConfig.mail.recipient,
    subject: mailerConfig.mail.subject,
    text:
    ctx.request.body.message.trim().slice(0, 500) +
    `\n Отправлено с: <${ctx.request.body.email}>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return ctx.redirect(encodeURI('/?msg=Письмо успешно отправлено!'));
  } catch (err) {
    return ctx.redirect(encodeURI('/?msg=При отправке письма произошла ошибка!'));
  }
};
