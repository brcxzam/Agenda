const express = require('express');
const morgan = require('morgan');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const app = express();
const multer = require('multer');
const uuid = require('uuid/v4');
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public', 'img', 'uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('profile_image'));
// Routes
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use('/', require('./routes/index'));
//Static files
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});