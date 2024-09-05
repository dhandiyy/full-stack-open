//BACKEND-MODULE (EXPRESS) and CONNECTION TO DATABASE

const config = require('./utils/config')
const express = require('express');
const cors = require('cors'); // Cross-origin resource sharing
const app = express();
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url)
	.then(result => {
		logger.info('connected to MongdoDb')
	})
	.catch(error => {
		logger.error('error connecting to MongoDb: ', error.message)
	})

app.use(express.static('dist'));
app.use(cors());
app.use(express.json()); // JSON body parser
app.use(middleware.requestLogger);
app.use('api/notes', notesRouter);
app.use(middleware.unknownEndpoint); // Unknown endpoint handler
app.use(middleware.errorHandler); // Error handler

module.exports = app