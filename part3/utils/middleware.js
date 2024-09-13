const logger = require('./logger');
const jwt = require('jsonwebtoken')

// Logger Middleware untuk request
const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method);
	logger.info('Path:', request.path);
	logger.info('Body:', request.body);
	logger.info('---');
	next();
};

// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// Custom error handler
const errorHandler = (error, request, response, next) => {
	logger.error('Error handler triggered:', error); // Logging untuk debug

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' });
	} else if(error.name === 'JsonWebTokenError'){
		return response.status(401).json({error: 'token invalid'})
	} else if(error.name === 'TokenExpiredError') {
		return response.status(401).json({error: 'token expired'})
	}
	next(error); // Pass to default error handler if not handled here
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	console.log('The authorization object: ', authorization)
	if (authorization && authorization.startsWith('Bearer ')) {
		const token = authorization.replace('Bearer ', '')
		try {
			request.token = jwt.verify(token, process.env.SECRET)
		} catch (error) {
			request.token = null
		}
	} else {
		request.token = null
	}
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
};
