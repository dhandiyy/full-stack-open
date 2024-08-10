import {useEffect, useState} from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {

    const [person, setPerson] = useState([])
    const [newPerson, setNewPerson] = useState({name:"", number:""})
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response =>{
                console.log("promise fulfilled")
                setPerson(response.data)
            })
    }, []);

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