const express = require('express');
const morgan = require('morgan');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const sassMiddleware = require('node-sass-middleware');
const app = express();
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public', 'css'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: false,
    prefix: '/css'
}));
//Routes
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use('/api/agenda', require('./routes/index'));
//Static files
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});