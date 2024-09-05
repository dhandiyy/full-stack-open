//A router object is an isolated instance of middleware and routes.

const express = require('express');
const notesRouter = express.Router()
const Note = require('../models/note');
const logger = require('../utils/logger')


notesRouter.get('/', (request, response) => {
	Note.find({})
		.then(notes => {
			response.json(notes)
		})
})

notesRouter.get('/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then(note => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
})

notesRouter.post('/', (request, response, next) => {
	const body = request.body

	if(!body.content) {
		return response.status(400).json({ error: 'Content missing' });
	}
	const note = new Note({
		content: body.content,
		important: body.important || false
	})

	note.save()
		.then(savedNote => {
			response.json(savedNote)
			logger.info('note saved!')
		})
		.catch(error => next(error));
})

notesRouter.put('/:id', (request, response, next) => {
	const {content, important} = request.body

	Note.findByIdAndUpdate(
		request.params.id,
		{ content, important },
		{new: true, runValidators: true, context: 'query'}
	)
		.then(updatedNote => {
			response.json(updatedNote)
		})
		.catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
	Note.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error));
})

module.exports = notesRouter


