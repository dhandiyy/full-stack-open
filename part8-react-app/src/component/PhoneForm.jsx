import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/client";
import {EDIT_PHONE} from "../queries.js";

const PhoneForm = ({setErrorMessage}) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const [changeNumber, result] = useMutation(EDIT_PHONE, {
		onError: (error) => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			setErrorMessage(messages)
		}
	})

	const submit = (event) => {
		event.preventDefault();
		changeNumber({variables: {name, phone}});
		setName("");
		setPhone("");
	}

	useEffect(() => {
		if(result.data && result.data.editNumber === null){
			setErrorMessage('person not found')
		}
	}, [result.data]);

	return (
		<div>
			<h2>change number</h2>
			<form onSubmit={submit}>
				<div>
					<label htmlFor="name">
						<span>name: </span>
						<input
							type="text"
							id="name"
							value={name}
							onChange={({target}) => setName(target.value)}/>
					</label>
				</div>

				<div>
					<label htmlFor="phone">
						<span>phone: </span>
						<input
							type="text"
							id="phone"
							value={phone}
							onChange={({target}) => setPhone(target.value)}/>
					</label>
				</div>
				<button type="submit">change number</button>
			</form>

		</div>
	);
};

export default PhoneForm;