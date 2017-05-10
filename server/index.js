const app = require('./app');

const PORT = process.env.PORT || 3000;

// Why don't I need http createServer
app.listen(PORT, () => {
	Error(`App listening on port ${PORT}!`);
});

function onError (error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? `Pipe ${port}`
		: `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		Error(`${bind} requires elevated privileges`);
		process.exit(1);
		break;
	case 'EADDRINUSE':
		Error(`${bind} is already in use`);
		process.exit(1);
		break;
	default:
		throw error;
	}
}

app.on('error', onError);
