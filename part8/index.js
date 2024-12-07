const {ApolloServer} = require('@apollo/server')
const { gql } = require('graphql-tag')
const { GraphQLError } = require('graphql')

const { v1: uuid } = require('uuid')
const {startStandaloneServer} = require('@apollo/server/standalone')

let persons = [
	{
		name: "Arto Hellas",
		phone: "040-123543",
		street: "Tapiolankatu 5 A",
		city: "Espoo",
		id: "3d594650-3436-11e9-bc57-8b80ba54c431"
	},
	{
		name: "Matti Luukkainen",
		phone: "040-432342",
		street: "Malminkaari 10 A",
		city: "Helsinki",
		id: '3d599470-3436-11e9-bc57-8b80ba54c431'
	},
	{
		name: "Venla Ruuska",
		street: "Nallemäentie 22 C",
		city: "Helsinki",
		id: '3d599471-3436-11e9-bc57-8b80ba54c431'
	},
]

//it's schema
const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }
    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo) : [Person!]!
        findPerson(name: String!): Person
    }
    
    enum YesNo {
	    YES
	    NO
    }
    
    type Mutation {
	    addPerson(
		    name: String!
            phone: String
            street: String!
            city: String!
	    ) : Person, #it's return value type
	    editNumber(
		    name: String!
		    phone: String!
	    ) : Person
    }
`;


const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: (root, args) => {
			if(!args.phone){
				return persons;
			}
			return persons.filter(p => args.phone === "YES" ? p.phone: !p.phone);
		},
		findPerson: (root, args) => persons.find(p => p.name === args.name)
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
		}
	},

	Mutation: {
		addPerson: (root, args) => {
			if (persons.find(p => p.name === args.name)) {
				throw new GraphQLError('Name must be unique', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name
					}
				})
			}
			const person = {...args, id: uuid()}
			persons = persons.concat(person)
			return person;
		},
		editNumber: (root, args) => {
			const person = persons.find(p => args.name === p.name);
			if(!person){
				return null
			}

			const updatePerson = {...person, phone: args.phone};
			persons = persons.map(p => p.name === args.name ? updatePerson : p);
			return  updatePerson;
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});


startStandaloneServer(server, {
	listen: {port: 4000},
}).then(({url}) => {
	console.log(`Server ready at ${url}`)
})

