const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailerConfig = require('../mailer.json');

const db = require('../models/db');
const skills = db.get('skills').value();
const products = db.get('products').value();

router.get('/', (req, res) => {
  res.render('pages/index', { ...skills, products, msgemail: req.query.msg });
});

router.post('/', (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.redirect('/?msg=Все поля нужно заполнить!');
  }

  const transporter = nodemailer.createTransport(mailerConfig.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: mailerConfig.mail.recipient,
    subject: mailerConfig.mail.subject,
    text:
    req.body.message.trim().slice(0, 500) +
    `\n Отправлено с: <${req.body.email}>`
  };

  transporter.sendMail(mailOptions,(err, info) => {
    if (err) {
      return res.redirect('/?msg=При отправке письма произошла ошибка!');
    }
    res.redirect('/?msg=Письмо успешно отправлено!');
  });
});

module.exports = router;
