import Note from "./components/Note.jsx";
import {useState} from "react";

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

    const handleInputChange = (event) => {
        console.log(event.target)
        const {name, value} = event.target;
        setNewPerson({...newPerson, [name]: value, id: person.length + 1} )
    }

    const handleInputSearching = (event) => {
        setSearchValue(event.target.value)
    }

    const filteredPersons = person.filter(prsn =>
        prsn.name.toLocaleLowerCase().includes(searchValue.toLowerCase()) ||
        prsn.number.includes(searchValue)
    )


    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with: <input onChange={handleInputSearching} value={searchValue}/>
            </div>
            <h2>Add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleInputChange}
                                 value={newPerson.name} //ini cuma initial value
                                 name="name"/>
                </div>
                <div>
                    number: <input name="number"
                                   onChange={handleInputChange}
                                   value={newPerson.number}/>
                </div>
                <div>
                    <button type="submit">submit</button>

                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {filteredPersons.map(prsn => (
                    <p key={prsn.id}>{prsn.id} {prsn.name} {prsn.number}</p>
                ))}

            </div>

        </div>
    )

}
export default App;