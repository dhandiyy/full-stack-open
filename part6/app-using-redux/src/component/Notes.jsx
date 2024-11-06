import {useDispatch, useSelector} from "react-redux";
import {toggleImportanceOf} from "../reducers/noteReducer.js";

const Note = ({note, handleClick}) => {
	return (
		<li onClick={handleClick}>
			{note.content}
			<strong>{note.important? 'Important' : 'Not Important'}</strong>
		</li>
	)
}

const Notes = () => {
	const dispatch = useDispatch()
	const notes = useSelector(note => note)

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