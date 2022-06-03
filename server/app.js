import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schema/index.js'

const { log } = console

const app = express()

app.use(cors())

// This route will be used as an endpoint to interact with Graphql,
// All queries will go through this route.
app.use('/graphql', graphqlHTTP({
  // directing express-graphql to use this schema to map out the graph
  schema,
  // directing express-graphql to use graphiql when goto '/graphql' address in the browser
  // which provides an interface to make GraphQl queries
  graphiql: true
}))

app.listen(3000, () => {
  log('Listening on port 3000')
})
