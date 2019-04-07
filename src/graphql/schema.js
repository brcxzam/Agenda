var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        users: [Users]
        user(id: ID): [Users]
    }
    type Mutation {
        createUser(data: UserIn!): Users
        updateUser(id: ID, data: UserIn): String
        deleteUser(id: ID): String
    }
    type Users {
        id: ID
        firstName: String
        lastName: String
        createdAt: String
        updatedAt: String
    }
    input UserIn {
        firstName: String
        lastName: String
    }
`);

module.exports = schema;
