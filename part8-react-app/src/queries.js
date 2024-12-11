import {gql} from "@apollo/client";

const PERSON_DETAILS = gql`
    fragment PersonDetails on Person {
        id
        name
        phone
        address {
            street
            city
        }
    }
`

export const ALL_PERSONS = gql`
    query {
        allPersons {
#            this using Fragment
            ...PersonDetails 
        }
    }
    ${PERSON_DETAILS}
`
export const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String){
        addPerson(
            name: $name
            city: $city
            street: $street
            phone: $phone
        ){
            name
            phone
            id
            address {
                city
                street
            }
        }
    }
`
export const EDIT_PHONE = gql`
    mutation editPhone($name: String!, $phone: String!){
        editNumber(
            phone: $phone
            name: $name
        ){
            name
            phone
            address {
                street
                city
            }
            id
        }
    }
`

export const FIND_PERSON = gql`
    query FindPerson($nameToSearch: String!){
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`

export const PERSON_ADDED = gql`
    subscription {
        personAdded {
            ...PersonDetails
        }
    }
    ${PERSON_DETAILS}
`
