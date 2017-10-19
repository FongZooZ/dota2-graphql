'use strict';

export default {
	RootQuery: {
		getHeroes: (source, args, context) => context.hero.getHeroes(args)
	}
};