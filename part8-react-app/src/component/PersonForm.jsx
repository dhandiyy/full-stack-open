import {useState} from "react";
import {useMutation} from "@apollo/client";
import {ALL_PERSONS, CREATE_PERSON} from "../queries.js";
import {updateCache} from "../App.jsx";

const PersonForm = ({setErrorMessage}) => {
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [street, setStreet] = useState("")
	const [city, setCity] = useState("")

	const [ createPerson ] = useMutation(CREATE_PERSON, {
		// refetchQueries: [  {query: ALL_PERSONS } ], //program hit query dua kali, better using update callback
		onError: (error) => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			setErrorMessage(messages)
		},
		update: (cache, response) => {
			updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
		},
	})

	const submit = (event) => {
		event.preventDefault();

		createPerson({variables: {name, street, city, phone: phone.length > 0 ? phone:undefined }});

		setName("");
		setPhone("");
		setStreet("");
		setCity("");

	}

	return (
		<div>
			<h2>Create New Person</h2>
			<form onSubmit={submit}>
				<div>
					<label htmlFor="name">
						<span>name:</span>
						<input type="text"
						       id="name" value={name}
						       onChange={({target}) => setName(target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="phone">
						<span>phone:</span>
						<input type="text"
						       id="phone"
						       value={phone}
						       onChange={({target}) => setPhone(target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="street">
						<span>street:</span>
						<input type="text"
						       id="street"
						       value={street}
						       onChange={({target}) => setStreet(target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="city">
						<span>city:</span>
						<input type="text"
						       id="city" value={city}
						       onChange={({target}) => setCity(target.value)}
						/>
					</label>
				</div>
				<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default PersonForm