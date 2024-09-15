const NoteForm = ({ addNote, newNote, handleChangeNote}) => {
	return (
		<div>
			<h2>Create a new note</h2>
			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={handleChangeNote}

				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default NoteForm