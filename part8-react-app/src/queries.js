import {gql} from "@apollo/client";

export const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
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
