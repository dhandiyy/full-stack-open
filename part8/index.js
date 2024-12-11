const {ApolloServer} = require('@apollo/server')
const jwt = require('jsonwebtoken')
const {v1: uuid} = require('uuid')
const {startStandaloneServer} = require('@apollo/server/standalone')
const mongoose = require('mongoose');
const User = require('./models/user')
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require('dotenv').config();

const {expressMiddleware} = require('@apollo/server/express4')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const {WebSocketServer} = require("ws");
const {useServer} = require("graphql-ws/lib/use/ws");

//database connection
mongoose.set('strictQuery', false);
console.log('connecting to', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDb');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})
mongoose.set('debug', true);

//standAlone server GraphQL
// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// });
// startStandaloneServer(server, {
// 	listen: {port: 4000},
// 	context: async ({req, res}) => {
// 		const auth = req ? req.headers.authorization : null;
// 		if (auth && auth.startsWith("Bearer ")) {
// 			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
// 			const currentUser = await User.findById(decodedToken.id).populate('friends');
// 			return {currentUser};
// 		}
// 	}
// }).then(({url}) => {
// 	console.log(`Server ready at ${url}`)
// })

const start = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)


	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({httpServer}),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						}
					}
				}
			}
		]
	})

	await server.start()

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({req}) => {
				const auth = req ? req.headers.authorization : null;
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
					const currentUser = await User.findById(decodedToken.id).populate(
						'friends'
					)
					return { currentUser };
				}
			}
		})
	)

	const PORT = 4000

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	)
}

start()