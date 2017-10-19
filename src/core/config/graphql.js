'use strict';

import schema from '../../graphql/schema';
import { debug } from '../config';
import context from '../../graphql/context';

export default function(req) {
	return {
		schema,
		rootValue: { req },
		context,
		debug
	};
}