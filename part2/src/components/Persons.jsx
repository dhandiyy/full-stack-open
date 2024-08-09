const Persons = ({person, searchValue}) => {
	const filteredPersons = person.filter(prsn =>
		prsn.name.toLocaleLowerCase().includes(searchValue.toLowerCase()) ||
		prsn.number.includes(searchValue)
	)
	return (
		<div>
			{filteredPersons.map(prsn => (
				<p key={prsn.id}>{prsn.id} {prsn.name} {prsn.number}</p>
			))}
		</div>
	)

}
export default Persons;