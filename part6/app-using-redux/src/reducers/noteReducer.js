import {createSlice, current} from "@reduxjs/toolkit";

const initialState = [
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

// const noteReducer = (state = initialNote, action) => {
// 	switch (action.type) {
// 		case 'NEW_NOTE':
// 			return [...state, action.payload]
// 		case 'TOGGLE_IMPORTANCE':
// 			const id = action.payload.id
// 			const noteToChange = state.find(note => note.id === id)
// 			const changedNote = {
// 				...noteToChange,
// 				important: !noteToChange.important
// 			}
// 			return state.map(note =>
// 				note.id !== id ? note : changedNote
// 			)
// 		default:
// 			return state
// 	}
// }


//this is action creator
// export const createNote = (content) => {
// 	return {
// 		type: "NEW_NOTE",
// 		payload: {
// 			content,
// 			important: false,
// 			id: generateId()
// 		}
// 	}
// }
//
// //this is action creator
// export const toggleImportanceOf = (id) => {
// 	return {
// 		type: 'TOGGLE_IMPORTANCE',
// 		payload : {id}
// 	}
// }

const generateId = () => {
	return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
	name: "notes",
	initialState : [],
	reducers: {
		createNote(state, action) { //type: "notes/createNote"
			const content = action.payload
			state.push(
				//ini memanfaatkan library Immer, jadi tetep immutability
				// {
				// content,
				// important: false,
				// id: generateId()
				// }
				content
				)
		},
		toggleImportanceOf(state, action) {
			const id = action.payload
			const noteToChange = state.find(n => n.id === id)
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			}
			console.log(current(state))

			return state.map(note =>
				note.id !== id ? note : changedNote
			)
		},
		appendNote(state, action) {
			state.push(action.payload)
		},
		setNotes(state, action) {
			return action.payload
		}
	}

})

export const {
	createNote,
	toggleImportanceOf,
	appendNote,
	setNotes
} = noteSlice.actions

export default noteSlice.reducer