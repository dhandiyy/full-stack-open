const Persons = ({person, searchValue, handleDelete}) => {
	const filteredPersons = person.filter(prsn =>
		prsn.name.toLocaleLowerCase().includes(searchValue.toLowerCase()) ||
		prsn.number.includes(searchValue)
	)

	return (
		<div>
			{filteredPersons.map(prsn => (
				<p key={prsn.id}>
					{prsn.id} {prsn.name} {prsn.number}
					<button onClick={() => handleDelete(prsn.id)}>delete</button>
				</p>

			))}
		</div>
	)

}
export default Persons;