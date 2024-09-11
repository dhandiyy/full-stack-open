const {after, beforeEach, describe, test} = require('node:test')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root', passwordHash})

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const userAtStart = await helper.usersInDb()

		const newUser = {
			username: 'dhandi',
			name: 'Dhandi Yudhit Yuniar',
			password: 'inipassword'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const userAtEnd = await helper.usersInDb()
		assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

		const usernames = userAtEnd.map(u => u.username)
		assert(usernames.includes(newUser.username))
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const userAtEnd = await helper.usersInDb()
		assert(result.body.error.includes('expected `username` to be unique'))

		assert.strictEqual(userAtEnd.length, usersAtStart.length)


	})
})

after(async () => {
	await mongoose.connection.close()
})