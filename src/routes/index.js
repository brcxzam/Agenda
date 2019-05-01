const {Router} = require('express');
const router = Router();
const {User} = require('../database/model');

router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;
