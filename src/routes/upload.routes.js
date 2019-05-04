import { Router } from 'express';
import { unlink } from 'fs';
const router = Router();

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

export default router;
