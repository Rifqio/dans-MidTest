const { PostRegister, PostLogin } = require('../controller/AuthController');
const router = require('express').Router();

router.post('/register', PostRegister)
router.post('/login', PostLogin)
module.exports = router;