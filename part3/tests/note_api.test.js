const { test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app) //superagent object (listen include)


describe('Test API', () => {

	beforeEach(async () => {
		await Note.deleteMany({})
		console.log('cleared')

		helper.initialNotes.forEach(async (note) => {
			let noteObject = new Note(note)
			await noteObject.save()
			console.log('saved')
		})
		console.log('done')
	})

	test('all notes are returned', async () => {
		const response = await api.get('/api/notes')

		assert.strictEqual(response.body.length, helper.initialNotes.length)
	})

	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/) //bisa juga isikan string
	})

	test('a specific note is within the returned notes', async () => {
		const response = await api.get('/api/notes')
		const contents = response.body.map(r => r.content)

		assert(contents.includes('Browser can execute only JavaScript'))
	})

	test('there are two notes', async () => {
		const response = await api.get('/api/notes')

		assert.strictEqual(response.body.length, 2)
	})

	test('the first note is about HTTP methods', async () => {
		const response = await api.get('/api/notes')

		const contents = response.body.map(e => e.content)
		assert(contents.includes('HTML is easy'), true)
	})

	test('a valid note can be added', async () => {
		const newNotes = {
			content: 'async/await simplifies making async calls',
			important: true,
		}

		await api
			.post('/api/notes')
			.send(newNotes)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const notesAtEnd = await helper.notesInDb()
		assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

		const contents = notesAtEnd.map(n => n.content)
		console.assert(contents.includes('async/await simplifies making async calls'))
	})

	test('note without content is not added', async () => {
		const newNote = {
			important: true
		}

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(400)

		const notesAtEnd = await helper.notesInDb()

		assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
	})

	test('a specific note can be viewed', async () => {
		const notesAtStart = await helper.notesInDb()
		const noteToView = notesAtStart[0]

		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		assert.deepStrictEqual(resultNote.body, noteToView)
	})

	test('a note can be deleted', async () => {
		const notesAtStart = await helper.notesInDb()
		const noteToDelete = notesAtStart[0]

		await api
			.delete(`/api/notes/${noteToDelete.id}`)
			.expect(204)

		const notesAtEnd = await helper.notesInDb()

		const contents = notesAtEnd.map(note => note.content)
		assert(!contents.includes(noteToDelete.content))

		assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
	})

	after(async () => {
		await mongoose.connection.close()
	})
})