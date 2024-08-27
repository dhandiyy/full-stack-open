const express = require('express')
const app = express()

app.use(express.json()) //json-parser

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

const port = 3001

app.get('/api/info', (request, response) => {
	const requestTime = new Date();
	const personCount = persons.length

	const responText = `
		<p>Phonebook has info for ${personCount} people</p>
		<p>${requestTime}</p>
	`
	response.send(responText)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(n => n.id === id)
	if(person){
		response.json(person)
	}else {
		response.status(404).end(`Not Found`) //'Not Found' akan ditampilkan
	}
})

app.delete('/api/person/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(n => n.id !== id)

	response.status(204).end()
})

const generatedId = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(n=> Number(n.id)))
		: 0
	return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {

	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Content missing'
		})
	}else if(persons.find(person => person.name === body.name)) {
		return response.json({
			error: 'Name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generatedId()
	}

	persons = persons.concat(person)

	response.json(person)
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	console.log(`http://localhost:${port}`)
})