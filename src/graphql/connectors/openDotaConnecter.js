'use strict';

import axios from 'axios';
import { domain } from '../../core/config';
import camelcaseKeys from 'camelcase-keys';

export async function fetch(endpoint, params, method = 'GET', isQs = true) {
	let url = `${domain}/${endpoint}`;

	let options = {
		method,
		url
	};

	let ret = {};

	try {
		let response = await axios(options);
		ret.data = response.data;
	} catch(errors) {
		console.log(errors);
	}

	ret = camelcaseKeys(ret, {deep: true});

	return ret;
}