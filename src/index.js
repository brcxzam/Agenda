const express = require('express');
const morgan = require('morgan');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const app = express();
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
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