import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from "@apollo/client/link/context/index.js";


const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
	const token = sessionStorage.getItem('phonenumbers-user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		}
	}
})

//client for communicating to apollo server
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)
})

createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
)
