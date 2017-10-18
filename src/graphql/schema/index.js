'use strict';

import { makeExecutableSchema } from 'graphql-tools';

// Temp
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
  type Query {
    allLinks: [Link!]!
  }
`;

export default makeExecutableSchema({typeDefs});