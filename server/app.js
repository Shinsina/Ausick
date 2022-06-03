import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/index.js';

const { log } = console;

const app = express();

app.use(cors());

app.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.get(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  log('Listening on port 3000');
});
