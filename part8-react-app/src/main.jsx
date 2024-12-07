import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client'


//client for communicating to apollo server
const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
})


createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
