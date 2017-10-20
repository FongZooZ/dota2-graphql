'use strict';

import { fetch } from '../connectors/openDotaConnecter';
import url from '../../core/config/url';

const getHeroes = async (params) => {
	let heroes = await fetch(url.getHeroes, params);
	return heroes;
}

export default {
	getHeroes
};