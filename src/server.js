'use strict';

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import numCPUs from 'os';

let app = express();
const expressPort = process.env.PORT || 3000;

if (process.env != 'production') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());

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
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

if (process.env == 'production') {
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
