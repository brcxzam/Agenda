import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import { unlink } from 'fs';
import multer from 'multer';
import { extname, join } from 'path';
import uuid from 'uuid/v4';
import root from '../graphql/root';
import schema from '../graphql/schema';
const router = Router();

router.post('/',
    graphqlHTTP((request, response, graphQLParams) => ({
        schema: schema,
        rootValue: root,
        context: {
            request: request
        }
    }))
);

const storage = multer.diskStorage({
    destination: join(__dirname, '..', 'public', 'img', 'uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + extname(file.originalname));
    }
});

router.post('/upload', multer({ storage }).single('profile_image'), async ({ body, file }, res) => {
    if (body.deleteImage) {
        unlink('src/public/img/uploads/' + body.deleteImage, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    }
    res.json({
        profile_image: file.filename
    });
});

router.post('/upload/delete', ({ body }, res) => {
    unlink('src/public/img/uploads/' + body.deleteImage, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
});

export default router;
