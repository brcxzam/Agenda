import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import root from '../graphql/root';
import schema from '../graphql/schema';
const router = Router();

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

export default router;
