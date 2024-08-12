import Note from "./components/Note.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("a new notes...");
    const [showAll, setShowAll] = useState(false);

    //Effect is tool to connect and synchronize application with external system
    useEffect(() => {
        axios
            .get("http://localhost:3001/notes")
            .then(respon => {
                console.log("promise fulfilled")
                setNotes(respon.data);
            })
    }, []); //[]-> initial value for how frequent the effect do



    //Penulisan lain dari effect
    // useEffect(() => {
    //     console.log('this from effect block')
    //
    //     const eventHandler = response => {
    //         console.log('promise fulfilled')
    //         setNotes(response.data)
    //     }
    //     const promise = axios.get('http://localhost:3001/notes')
    //     promise.then(eventHandler)
    //
    // }, [])



    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    //event.target -> object HTMLnya (DOM) dari komponen yang menggunakan event ini. ex: form and input
    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }

        const updateNotes = notes.concat(noteObject)
        setNotes(updateNotes);
        setNewNote("add new notes...")
        console.log(updateNotes)
    }

    const handleChangeNote = (event) => {
        setNewNote(event.target.value)
        console.log("ini adalah panjang notes", notes.length)
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>show {showAll? "important" : "all"}</button>
            <ul>
                {notesToShow.map(notes =>
                    <Note key={notes.id} notes={notes} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleChangeNote}

                />
                <button type="submit">save</button>
            </form>
        </div>
    )

}
export default App;