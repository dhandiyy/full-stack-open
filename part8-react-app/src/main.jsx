import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split} from '@apollo/client'
import {setContext} from "@apollo/client/link/context/index.js";
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
	const token = sessionStorage.getItem('phonenumbers-user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		}
	}
})

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(
	createClient({url: 'ws://localhost:4000'})
)

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)


//client for communicating to apollo server
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
})

createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
)
