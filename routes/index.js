const express = require('express');
const router = express.Router();

const db = require('../models/db');
const skills = db.get('skills').value();
const products = db.get('products').value();

router.get('/', (req, res) => {
  res.render('pages/index', { ...skills, products });
});

module.exports = router;
