const express = require('express');
const morgan = require('morgan');
// const { join } = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const app = express();

const { join, extname } = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Routes
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
const storage = multer.diskStorage({
    destination: join(__dirname, 'public', 'img', 'uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + extname(file.originalname));
    }
});
app.use('/upload', multer({ storage }).single('profile_image'), require('./routes/index'));
//Static files
app.use(express.static(join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});