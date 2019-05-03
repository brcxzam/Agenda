const { Router } = require('express');
const router = Router();
const { unlink } = require('fs');
router.post('/', async ({ body, file }, res) => {
    if (body.deleteImage) {
        unlink('src/public/img/uploads/'+body.deleteImage, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    }
    res.json({
        profile_image: file.filename
    });
});
router.post('/delete',({body}, res) => {
    unlink('src/public/img/uploads/'+body.deleteImage, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
});

module.exports = router;
