const express = require('express');
const cors = require('cors'); // Cross-origin resource sharing
const app = express();
require('dotenv').config();

const Note = require('./models/Note');

// Middleware untuk melayani file frontend statis
app.use(express.static('dist'));

// Logger Middleware untuk request
const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:', request.path);
	console.log('Body:', request.body);
	console.log('---');
	next();
};

// Custom error handler
const errorHandler = (error, request, response, next) => {
	console.error(error.name);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error); // Pass to default error handler if not handled here
};

app.use(cors());
app.use(express.json()); // JSON body parser
app.use(requestLogger);

// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// Routes
app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
	Note.find({})
		.then(notes => {
			response.json(notes);
		});
});

app.get('/api/notes/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then(note => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
	Note.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch(error => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
	const { content, important } = request.body;

	Note.findByIdAndUpdate(
		request.params.id,
		{ content, important },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedNote => {
			response.json(updatedNote);
		})
		.catch(error => next(error));
});

app.post('/api/notes', (request, response, next) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({ error: 'Content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false
	});

	note.save()
		.then(savedNote => {
			response.json(savedNote);
			console.log('Note saved!');
		})
		.catch(error => next(error));
});

app.use(unknownEndpoint); // Unknown endpoint handler
app.use(errorHandler); // Error handler

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(`http://localhost:${port}`);
});
