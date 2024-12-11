import {useApolloClient, useQuery, useSubscription} from '@apollo/client'
import Persons from "./component/Persons.jsx";
import PersonForm from "./component/PersonForm.jsx";
import {ALL_PERSONS, PERSON_ADDED} from "./queries.js";
import {useState} from "react";
import PhoneForm from "./component/PhoneForm.jsx";
import LoginForm from "./component/LoginForm.jsx";
import Notify from "./component/Notify.jsx";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving same person twice
	const uniqByName = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.name
			return seen.has(k) ? false : seen.add(k)
		})
	}

	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqByName(allPersons.concat(addedPerson)),
		}
	})
}


const App = () => {
	const [token, setToken] = useState(null)
	const [errorMessage, setErrorMessage] = useState()
	const result = useQuery(ALL_PERSONS, {
		// pollInterval: 5000 //to make poll every 5 seconds
	});

	useSubscription(PERSON_ADDED, {
		onData: ({data, client}) => {
			const addedPerson = data.data.personAdded;
			notify(`${addedPerson.name} added`)
			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)

			console.log(data.data.personAdded);
		}
	})

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
