import Note from "./components/Note.jsx";
import {useEffect, useState} from "react";
import noteService from "./services/note.js";
import Notification from "./components/Notification.jsx";

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 14
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of Computer Science, University of Helsinki 2024</em>

        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    //Effect is tool to connect and synchronize application with external system
    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
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


    //event.target -> object HTMLnya (DOM) dari komponen yang menggunakan event ini. ex: form and input
    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote("")
            })

    }

    const handleChangeNote = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportance = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(n => n.id !== id? n : response))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n=> n.id !== id))
            })

    }
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
            </div>
            <ul>
                {notesToShow.map(notes =>
                    <Note key={notes.id} notes={notes} toggleImportance={() => toggleImportance(notes.id)}/>
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
            <Footer/>
        </div>
    )

}
export default App;