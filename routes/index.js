const Router = require('koa-router');
const router = new Router();

const getHome = require('./home/getHome');
const postHome = require('./home/postHome');
const getLogin = require('./login/getLogin');
const postLogin = require('./login/postLogin');
const getAdmin = require('./admin/getAdmin');
const postSkills = require('./admin/postSkills');
const postUpload = require('./admin/postUpload');

router.get('/', getHome);
router.post('/', postHome);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/admin', getAdmin);
router.post('/admin/skills', postSkills);
router.post('/admin/upload', postUpload);

module.exports = router;
