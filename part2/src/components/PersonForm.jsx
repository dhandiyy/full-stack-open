const PersonForm = ({addPerson, newPerson, setNewPerson, person}) => {
	const handleInputChange = (event) => {
		const {name, value} = event.target
		setNewPerson({...newPerson, [name]:value, id: person.length + 1})
	}
	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input onChange={handleInputChange}
				             value={newPerson.name} //ini cuma initial value
				             name="name"/>
			</div>
			<div>
				number: <input name="number"
				               onChange={handleInputChange}
				               value={newPerson.number}/>
			</div>
			<div>
				<button type="submit">submit</button>

			</div>
		</form>
	)

}
export default PersonForm;