import PropTypes from "prop-types";

const Note = ({notes, toggleImportance}) =>{
	const label = notes.important ? 'make not important' : 'make important'
	return (
		<li className="note">
			{notes.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>

	)
}

Note.propTyepes = {
	notes: PropTypes.object.isRequired,
	toggleImportance: PropTypes.func.isRequired
}

export default Note