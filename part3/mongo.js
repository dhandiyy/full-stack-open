const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const url =process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
	.then(result => {
		console.log('connected to MongdoDb')
	})
	.catch(error => {
		console.log('error connecting to MongoDb: ', error.message)
	})

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
})

const Note = mongoose.model('Note', noteSchema)
const note = new Note({
	content: 'HTML is not easy',
	important: false
})

//SAVE NEW NOTE
// note.save().then(result => {
// 	console.log('note saved!')
// 	console.log(note)
// 	mongoose.connection.close()
// })

//GET NOTES
// Note.find({important: true})
// .then(result => {
// 	result.forEach(note => {
// 		console.log(note)
// 	})
// 	mongoose.connection.close()
// })

module.exports = mongoose.model('Note', noteSchema)
