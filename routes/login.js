const express = require('express');
const router = express.Router();

const db = require('../models/db');
const admin = db.get('admin').value();

router.get('/', (req, res) => {
  res.render('pages/login', { msglogin: req.query.msg });
});

router.post('/', (req, res) => {
  if (req.body.email === admin.email && req.body.password === admin.password) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/login?msg=Неправильно введен e-mail или пароль!');
  }
});

module.exports = router;
