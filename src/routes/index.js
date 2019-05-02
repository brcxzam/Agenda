const { Router } = require('express');
const router = Router();
const { User, Setting, Day, Notification } = require('../database/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/upload', async ({ body, file }, res) => {
    const { password } = body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    body.password = hash;
    if (file) {
        body.profile_image = file.filename;
    }
    const user = await User.create(body);
    const {id} = user;
    const days = await Day.create();
    const notification = await Notification.create();
    await Setting.create({user : id, days : days.id, notification : notification.id});
    res.json({
        id
    });
});
module.exports = router;
