'use strict';

import rootQuery from './root.graphql';
import hero from './hero.graphql';

const schema = `
  schema {
    query: RootQuery
  }
`;

export default [
	rootQuery,
	schema,
	hero
];