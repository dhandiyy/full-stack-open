const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	phone: {
		type: String,
		minlength: 5
	},
	street: {
		type: String,
		required: true,
		minlength: 5
	},
	city: {
		type: String,
		required: true,
		minlength: 3
	},
})

//WHEN USING GRAPHQL THIS METHOD AUTOMATICALLY DONE BY GRAPHQL
// personSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString()
// 		delete returnedObject._id
// 		delete returnedObject.__v
// 	}
// })

module.exports = mongoose.model('Person', personSchema);