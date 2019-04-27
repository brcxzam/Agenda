const {Router} = require('express');
const router = Router();
const {User} = require('../database/model');

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

module.exports = router;
