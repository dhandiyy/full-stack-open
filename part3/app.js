//BACKEND-MODULE (EXPRESS) and CONNECTION TO DATABASE

const express = require('express');
const cors = require('cors'); // Cross-origin resource sharing
const app = express();
require('express-async-errors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose');
const config = require('./utils/config')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(result => {
		logger.info('connected to MongdoDb')
	})
	.catch(error => {
		logger.error('error connecting to MongoDb: ', error.message)
	})

app.use(cors());
app.use(express.static('dist'));
app.use(express.json()); // JSON body parser
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter);

if(process.env.NODE_ENV === 'test'){
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint); // Unknown endpoint handler
app.use(middleware.errorHandler); // Error handler

module.exports = app