const Person = require("./models/person");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const {GraphQLError} = require("graphql/index");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
	Query: {
		personCount: async () => Person.collection.countDocuments(),
		allPersons: async (root, args) => {
			console.log('Person.find')

			if(!args.phone){
				//automatically using await, promise done by resolver
				return Person.find({});
			}
			return Person.find({phone: {$exists: args.phone === "YES"}})

		},
		findPerson: async (root, args) => Person.findOne({name: args.name}),
		me: async (root, args, context) => context.currentUser
	},
	//but down here also have a default resolver
	// Person: {
	// 	name: (root) => root.name,
	// 	phone: (root) => root.phone,
	// 	street: (root) => root.street,
	// 	city: (root) => root.city,
	// 	id: (root) => root.id
	// }
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city
			}
		},
		friendOf: async (root) => {
			const friends = await User.find({ friends: { $in: [root._id] } })
			console.log("User.find")
			return friends;
		}

	},

	Mutation: {
		addPerson: async (root, args, context) => {
			const person = new Person({...args});
			const currentUser = context.currentUser;
			const isPersonAlreadyAdd = await Person.findOne({name: args.name});


			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			if(isPersonAlreadyAdd) {
				throw new GraphQLError('name person already exist', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			try{
				await person.save()
				currentUser.friends = currentUser.friends.concat(person)
				await currentUser.save()
			}catch (error) {
				throw new GraphQLError('Saving person failed', {
					extensions : {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				})
			}

			await pubsub.publish('PERSON_ADDED', {personAdded: person})

			return person;
		},

		editNumber: async (root, args) => {
			const person = await Person.findOne({name: args.name});
			person.phone = args.phone;

			try {
				await person.save()
			} catch (error) {
				throw new GraphQLError('Saving number failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				})
			}

			return person;
		},
		createUser: async (root, args) => {
			const user = new User({username: args.username});

			return user.save()
				.catch(error => {
					throw new GraphQLError('Creating the user failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.username,
							error
						}
					})
				})
		},
		login: async (root, args) => {
			const user = await User.findOne({username: args.username});
			if(!user || args.password !== 'secret'){
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
		addAsFriend: async (root, args, {currentUser}) => {
			const isFriend = (person) => {
				return  currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
			}

			if (!currentUser) {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' }
				})
			}

			const person = await Person.findOne({ name: args.name })
			if ( !isFriend(person) ) {
				currentUser.friends = currentUser.friends.concat(person)
			}

			await currentUser.save()

			return currentUser

		}
	},

	Subscription: {
		personAdded: {
			subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')
		},
	},
}

module.exports = resolvers