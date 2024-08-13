const Note = ({notes, toggleImportance}) =>{
	const label = notes.important ? 'make not important' : 'make important'
	return (
		<li>
			{notes.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>

	)
}

export default Note