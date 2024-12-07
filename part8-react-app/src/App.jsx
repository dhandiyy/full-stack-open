import {useQuery} from '@apollo/client'
import Persons from "./component/Persons.jsx";
import PersonForm from "./component/PersonForm.jsx";
import {ALL_PERSONS} from "./queries.js";
import {useState} from "react";
import PhoneForm from "./component/PhoneForm.jsx";

const App = () => {
	const [error, setError] = useState()
	const result = useQuery(ALL_PERSONS, {
		// pollInterval: 5000 //to make poll every 5 seconds
	});

	if (result.loading) {
		return <div>Loading...</div>
	}

	const notify = (message) => {
		setError(message)
		setTimeout(() => {
			setError(null)
		}, 5000)
	}

	return (
		<div>
			<Notify errorMessage={error}/>
			<Persons persons={result.data.allPersons}/>
			<PersonForm setError={notify}/>
			<PhoneForm setError={notify}/>
		</div>
	)
}

export default App

const Notify = ({errorMessage}) => {
	if ( !errorMessage ) {
		return null
	}
	return (
		<div style={{color: 'red'}}>
			{errorMessage}
		</div>
	)
}
