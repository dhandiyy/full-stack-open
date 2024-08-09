const Filter = ({handleInputSearching, searchValue}) => {
	return (
		<div>
			filter shown with: <input onChange={handleInputSearching} value={searchValue}/>
		</div>
	)

}
export default Filter;