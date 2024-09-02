const express = require('express')
const cors = require('cors') //Cross-origin resource sharing
const app = express()
require('dotenv').config()

const Note = require('./models/Note')

app.use(express.json()) //json-parser
app.use(cors())
app.use(express.static('dist')) //FILE FRONTEND


let notes = [
]

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
			response.json(note)
		})
	// const id = request.params.id
	// const note = notes.find(n => n.id === id)
	// if(note){
	// 	response.json(note)
	// }else {
	// 	response.status(404).end(`Not Found`) //'Not Found' akan ditampilkan
	// }
})

app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id
	notes = notes.filter(n => n.id !== id)

	response.status(204).end()
})

const generatedId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n=> Number(n.id)))
		: 0
	return String(maxId + 1)
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

const port = process.env.port || 3001

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	console.log(`http://localhost:${port}`)
})