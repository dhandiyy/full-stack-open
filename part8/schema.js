//it's schema
const gql = require("graphql-tag");

const typeDefs = gql`
    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        firendOf: [User!]!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo) : [Person!]!
        findPerson(name: String!): Person
        me: User
    }
    
    type Subscription {
        personAdded: Person!
    }

    enum YesNo {
        YES
        NO
    }

    fragment PersonDetails on Person {
        name
        phone
        address {
            city
            street
        }
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

        createUser(
            username: String!
        ):  User
        login(
            username: String!
            password: String!
        ): Token

        addAsFriend(
            name: String!
        ): User
    }
`;

module.exports = typeDefs