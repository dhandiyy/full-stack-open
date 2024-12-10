import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries.js";

const LoginForm = ({setError, setToken}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [ login, result ] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			sessionStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data]);

	const submit = (event) => {
		event.preventDefault();
		login({variables: {username, password}});

	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					<label htmlFor="username">
						<span>username</span>
						<input
							type="text"
							id="username"
							value={username}
							onChange={({target}) => setUsername(target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="password">
						<span>password</span>
						<input
							type="text"
							id="password"
							value={password}
							onChange={({target}) => setPassword(target.value)}
						/>
					</label>
				</div>
				<button type={"submit"}>login</button>
			</form>
		</div>
	);
};

export default LoginForm;