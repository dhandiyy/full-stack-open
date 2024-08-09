import {useState} from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {

    const [person, setPerson] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newPerson, setNewPerson] = useState({name:"", number:""})
    const [searchValue, setSearchValue] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        if(person.some(ppl => ppl.name === newPerson.name)){
           return alert(`${newPerson.name} is already added to phonebook`)
        }

        const updatePerson = person.concat(newPerson)
        setPerson(updatePerson)
        const resetNewPerson = {name:"", number:""}
        setNewPerson(resetNewPerson)

    }
    const handleInputSearching = (event) => {
        setSearchValue(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchValue={searchValue} handleInputSearching={handleInputSearching}/>
            <h3>Add new</h3>
            <PersonForm setNewPerson={setNewPerson} addPerson={addPerson} newPerson={newPerson} person={person}/>
            <h3>Numbers</h3>
            <Persons person={person} searchValue={searchValue}/>
        </div>
    )

}
export default App;