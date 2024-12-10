import {useApolloClient, useQuery} from '@apollo/client'
import Persons from "./component/Persons.jsx";
import PersonForm from "./component/PersonForm.jsx";
import {ALL_PERSONS} from "./queries.js";
import {useState} from "react";
import PhoneForm from "./component/PhoneForm.jsx";
import LoginForm from "./component/LoginForm.jsx";

const App = () => {
	const [token, setToken] = useState(null)
	const [errorMessage, setErrorMessage] = useState()
	const result = useQuery(ALL_PERSONS, {
		// pollInterval: 5000 //to make poll every 5 seconds
	});
	const client = useApolloClient()

	if (result.loading) {
		return <div>Loading...</div>
	}

	const logout = () => {
		setToken(null)
		sessionStorage.clear()
		client.resetStore()
	}

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<h2>Login</h2>
				<LoginForm
					setToken={setToken}
					setErrorMessage={notify}
				/>
			</div>
		)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage}/>
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons}/>
			<PersonForm setErrorMessage={notify}/>
			<PhoneForm setErrorMessage={notify}/>
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
