const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
	content : {  //validator
		type: String,
		minLength: 5,
		required: true
	},
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

//to edit the property of note model/schema
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

//different exports module for just export the model not others like url and mongoose
module.exports = mongoose.model('Note', noteSchema)
