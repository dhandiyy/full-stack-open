//A router object is an isolated instance of middleware and routes.

const notesRouter = require('express').Router()
const Note = require('../models/note');
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({})
	response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {

	//USING ASYNC/AWAIT
	// try{
	// 	const note = await Note.findById(request.params.id)
	// 	if(note) {
	// 		response.json(note)
	// 	}else {
	// 		response.status(404).end()
	// 	}
	// }catch (exception) {
	// 	next(exception)
	// }

	//USING PROMISE
	// Note.findById(request.params.id)
	// 	.then(note => {
	// 		if (note) {
	// 			response.json(note);
	// 		} else {
	// 			response.status(404).end();
	// 		}
	// 	})
	// 	.catch(error => next(error));

	//USING EXPRESS-ASYNC-ERRORS
	const note = await Note.findById(request.params.id)
	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})
notesRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = request.token

	console.log('The token: ', decodedToken)

	if(!decodedToken.id){
		return response.status(401).json({error: 'token invalid'})
	}
	const user = await User.findById(decodedToken.id)

	// if(!body.content) {
	// 	return response.status(400).json({ error: 'Content missing' });
	// }

	const note = new Note({
		content: body.content,
		important: body.important || false,
		user: user.id
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote.id)
	await user.save()

	response.status(201).json(savedNote)
})

notesRouter.put('/:id', (request, response, next) => {
	const {content, important} = request.body

	Note.findByIdAndUpdate(
		request.params.id,
		{ content, important },
		{new: true, runValidators: true, context: 'query'} //new:true -> for make a new modified document
	)
		.then(updatedNote => {
			response.json(updatedNote)
		})
		.catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

module.exports = notesRouter


