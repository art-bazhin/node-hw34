const path = require('path');
const fs = require('fs');
const db = require('../../models/db');

module.exports = async ctx => {
  let files = ctx.request.body.files;
  let fields = ctx.request.body.fields;
  let msg = '';

  if (!files.photo.size || !files.photo.name) {
    msg += 'Изображение товара не выбрано! ';
  }

  if (!fields.name) {
    msg += 'Не указано название товара! ';
  }

  if (!fields.price) {
    msg += 'Не указана цена товара! ';
  }

  if (msg) {
    fs.unlink(files.photo.path);
    ctx.redirect(encodeURI('/admin?msgfile=' + msg));
  } else {
    db.get('products')
      .push({
        src: path.join('/', path.relative('public', files.photo.path)),
        name: fields.name,
        price: fields.price
      }).write();
    ctx.redirect(encodeURI('/admin?msgfile=Товар добавлен'));
  }
};
