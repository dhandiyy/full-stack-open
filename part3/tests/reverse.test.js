const {reverse} = require('../utils/for_testing')

test('of a', () => {
	const result = reverse('a')

	expect(result).toBe('a')
})

test('of kasurrusak', () => {
	const result = reverse('kasurrusak')

	expect(result).toBe('kasurrusak')
})

test('of react', () => {
	const result = reverse('react')

	expect(result).toBe('tcaer')
})