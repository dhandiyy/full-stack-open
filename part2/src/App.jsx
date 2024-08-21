import {useEffect, useState} from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/persons.js"
import Notification from "./services/Notification.jsx";

const App = () => {

    const [person, setPerson] = useState([])
    const [newPerson, setNewPerson] = useState({name:"", number:""})
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                console.log(response)
                setPerson(response)
            })
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        if(person.some(ppl => ppl.name === newPerson.name)){
           return alert(`${newPerson.name} is already added to phonebook`)
        }

        if(person.some(ppl => ppl.number === newPerson.number)){
            if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){

                const personToUpdate = person.find(ppl => ppl.number === newPerson.number)
                const updatePerson = {...personToUpdate, number : newPerson.number, name: newPerson.name}

                personService
                    .update(personToUpdate.id, updatePerson)
                    .then(returnedPerson => {
                        setPerson(person.map(ppl => ppl.id !== personToUpdate.id? ppl : returnedPerson))
                        const resetNewPerson = {name:"", number:""}
                        setNewPerson(resetNewPerson)
                    })
                    .catch(error => {
                        setMessage(`Information ${personToUpdate.name} has already been removed from server`)
                        setStatus('error')
                    })
                return;
            }
        }

        personService
            .create(newPerson)
            .then(returnPerson => {
                const updatePerson = person.concat(returnPerson)
                setPerson(updatePerson)
                const resetNewPerson = {name:"", number:""}
                setNewPerson(resetNewPerson)
                setMessage(
                    `Adedd ${returnPerson.name}`
                )
                setStatus('success')
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            })


    }
    const handleInputSearching = (event) => {
        setSearchValue(event.target.value)
    }

    const handleDelete = (id) => {
        const personToDelete = person.find(prsn => prsn.id === id)

        if(window.confirm(`Delete ${personToDelete.name}?`)) {
            personService
                .deletePerson(personToDelete.id)
                .then(response => {
                    setPerson(person.filter(prsn => prsn.id !== personToDelete.id))
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} status={status}/>
            <Filter searchValue={searchValue} handleInputSearching={handleInputSearching}/>
            <h3>Add new</h3>
            <PersonForm setNewPerson={setNewPerson} addPerson={addPerson} newPerson={newPerson} person={person}/>
            <h3>Numbers</h3>
            <Persons person={person} searchValue={searchValue} handleDelete={handleDelete}/>
        </div>
    )

}
export default App;