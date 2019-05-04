import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import multer from 'multer';
import { extname, join } from 'path';
import uuid from 'uuid/v4';
import api from './routes/api.routes';
import upload from './routes/upload.routes';
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: join(__dirname, 'public', 'img', 'uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + extname(file.originalname));
    }
});

//Routes
app.use('/api', api);
app.use('/upload', multer({ storage }).single('profile_image'), upload);

//Static files
app.use(express.static(join(__dirname, 'public')));

export default app;
