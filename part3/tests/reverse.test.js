const { test, describe} = require('node:test')
const assert = require('node:assert')

const {reverse} = require('../utils/for_testing')

describe('reverse', () => {
	test('of a', () => {
		const result = reverse('a')

		assert.strictEqual(result, 'a')
	})

	test('of kasurrusak', () => {
		const result = reverse('kasurrusak')

		assert.strictEqual(result, 'kasurrusak')
	})

	test('of react', () => {
		const result = reverse('react')

		assert.strictEqual(result, 'tcaer1')
	})
})
