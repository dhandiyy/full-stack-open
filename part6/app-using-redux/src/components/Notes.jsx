import {useDispatch, useSelector} from "react-redux";
import {toggleImportanceOf} from "../reducers/noteReducer.js";

const Note = ({note, handleClick}) => {
	return (
		<li onClick={handleClick}>
			{note.content}
			<strong>{note.important ? 'Important' : 'Not Important'}</strong>
		</li>
	)
}

const Notes = () => {
	const dispatch = useDispatch()
	const notes = useSelector(state => {
		if (state.filter === "ALL") {
			return state.notes
		}
		return state.filter === "IMPORTANT"
			? state.notes.filter(note => note.important)
			: state.notes.filter(note => !note.important)
	})

	return (
		<div>
			<ul>
				{notes.map(note =>
					<Note
						key={note.id}
						note={note}
						handleClick={() => dispatch(toggleImportanceOf(note.id))}
					/>
				)}
			</ul>

		</div>
	)
}

export default Notes