const initialNote = [
	{
		content: 'reducer defines how redux store works',
		important: true,
		id: 1,
	},
	{
		content: 'state of store can contain any data',
		important: false,
		id: 2,
	},
]

const noteReducer = (state = initialNote, action) => {
	switch (action.type) {
		case 'NEW_NOTE':
			return [...state, action.payload]
		case 'TOGGLE_IMPORTANCE':
			const id = action.payload.id
			const noteToChange = state.find(note => note.id === id)
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			}
			return state.map(note =>
				note.id !== id ? note : changedNote
			)
		default:
			return state
	}
}

const generateId = () => {
	return  Number((Math.random() * 1000000).toFixed(0))
}

//this is action creator
export const createNote = (content) => {
	return {
		type: "NEW_NOTE",
		payload: {
			content,
			important: false,
			id: generateId()
		}
	}
}

//this is action creator
export const toggleImportanceOf = (id) => {
	return {
		type: 'TOGGLE_IMPORTANCE',
		payload : {id}
	}
}

export default noteReducer