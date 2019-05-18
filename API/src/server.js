import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import api from './routes/api.routes';
import cors from 'cors';
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

//Routes
app.use('/api', api);

//Static files
app.use(express.static('public'));

export default app;
