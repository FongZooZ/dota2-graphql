'use strict';
require('newrelic');

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import numCPUs from 'os';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import graphqlConfig from './core/config/graphql';
import { debug } from './core/config';

let app = express();
const expressPort = process.env.PORT || 3000;

if (debug) app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.route('/graphql')
	.post(bodyParser.json(), graphqlExpress(graphqlConfig));

app.route('/').
	get(graphiqlExpress({ endpointURL: '/graphql' }));

app.route('/api/test').
	get((req, res, next) => res.json({yo: true}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = debug ? err : {};

	// render the error page
	res.status(err.status || 500);
	// TODO: view engine
	res.end();
	// res.render('error');
});

if (!debug) {
	if (cluster.isMaster) {
		console.log(`Master ${process.pid} is running`);

		// Fork workers.
		for (let i = 0; i < numCPUs.cpus().length; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code) => {
			console.log(`worker ${worker.process.pid} died with code: ${code}`);
		});
	} else {
		app.listen(expressPort, () => {
			console.log(`Worker ${process.pid}: Express server is listen on ${expressPort}`);
		});
	}
} else {
	app.listen(expressPort, () => {
		console.log(`Express server is listen on ${expressPort}`);
	});
}