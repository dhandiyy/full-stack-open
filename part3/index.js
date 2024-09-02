const express = require('express')
const cors = require('cors') //Cross-origin resource sharing
const app = express()
require('dotenv').config()

const Note = require('./models/Note')

app.use(cors())
app.use(express.static('dist')) //FILE FRONTEND

const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method)
	console.log('Path: ', request.path)
	console.log('Body: ', request.body)
	console.log('---')
	next()
}


app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'Content missing'
		})
	}

	const note = new Note({
		content : body.content,
		important : body.important || false
	})

	note.save()
		.then(result  => {
			response.json(result)
			console.log('note saved!')
		})
})

app.use(express.json()) //json-parser
app.use(requestLogger)


app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
	Note.find({})
		.then(notes => {
			response.json(notes)
		})
})

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id)
		.then(note => {
			if(note){
				response.json(note)
			}else{
				response.status(404).end()
			}
		})
		.catch(error => next(error))

})

app.delete('/api/notes/:id', (request, response) => {
	Note.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end
		})
		.catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content : body.content,
		important : body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, {new: true})
		.then(updatedNote => {
			response.json(updatedNote)
		})
		.catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler  = (request, response, error, next) => {
	console.error(error.message)

	if(error.name === 'CastError') {
		return response.status(400).send({error: 'malfortmatted id'})
	}
	next(error)
}

app.use(errorHandler)

const port = process.env.port || 3001

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	console.log(`http://localhost:${port}`)
})