'use strict';

import schema from '../../graphql/schema';
import { debug } from '../config';

export default function(req) {
	return {
		schema,
		rootValue: {
			req
		},
		context: {
		},
		debug: debug,
	};
}