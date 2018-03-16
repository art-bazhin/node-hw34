const path = require('path');
const fs = require('fs');

const express = require('express');
const router = express.Router();
const formidable = require('formidable');

const db = require('../models/db');
const skills = db.get('skills').value();

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/login');
};

router.use(isAdmin);

router.get('/', (req, res, next) => {
  res.render('pages/admin',
    {
      ...skills,
      msgskill: req.query.msgskill,
      msgfile: req.query.msgfile
    });
});

router.post('/skills', (req, res) => {
  const body = req.body;

  if (+body.age) db.set('skills.age', body.age).write();
  if (+body.years) db.set('skills.years', body.years).write();
  if (+body.concerts) db.set('skills.concerts', body.concerts).write();
  if (+body.cities) db.set('skills.cities', body.cities).write();

  res.redirect('/admin?msgskill=Данные обновлены');
});

router.post('/upload', (req, res, next) => {
  const uploadDir = '/uploads';
  const uploadPath = path.join('/public', uploadDir);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(process.cwd(), uploadPath);

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir);
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }

    if (files.photo.name === '' || files.photo.size === 0) {
      return res.redirect('/admin?msgfile=Изображение товара не выбрано!');
    }

    if (!fields.name) {
      fs.unlink(files.photo.path);
      return res.redirect('/admin?msgfile=Не указано название товара!');
    }

    if (!fields.price) {
      fs.unlink(files.photo.path);
      console.log(files.photo.path);
      return res.redirect('/admin?msgfile=Не указана цена товара!');
    }

    db.get('products')
      .push({
        src: path.join(uploadDir, path.basename(files.photo.path)),
        name: fields.name,
        price: fields.price
      }).write();

    return res.redirect('/admin?msgfile=Товар добавлен');
  });
});

module.exports = router;
