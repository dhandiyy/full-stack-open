import {useDispatch} from "react-redux";
import {createNote} from "../reducers/noteReducer.js";

const NewNote = () => {
	const dispatch = useDispatch

	const addNote = (event) => {
		event.preventDefault()
		const content = event.target.note.value
		event.target.note.value = ""
		dispatch(createNote(content))

	}
	return (
		<div>
			<form onSubmit={addNote}>
				<input type="text" name="note"/>
				<button type="submit">add</button>
			</form>
		</div>
	)
}

export default NewNote