const logger = require('./logger');

// Logger Middleware untuk request
const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method);
	logger.info('Path:', request.path)
	logger.info('Body:', request.body)
	logger.info('---')
	next();
};

// Custom error handler
const errorHandler = (error, request, response, next) => {
	logger.error(error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error); // Pass to default error handler if not handled here
};

// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint
}