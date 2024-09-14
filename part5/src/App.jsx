import Note from "./components/Note.jsx";
import {useEffect, useState} from "react";
import noteService from "./services/note.js";
import Notification from "./components/Notification.jsx";
import loginService from "./services/login.js"
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";
import NoteForm from "./components/NoteForm.jsx";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    //Effect is tool to connect and synchronize application with external system
    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
            })
    }, []); //[]-> initial value for how frequent the effect do

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

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
        console.log(note)

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
                console.log(error)
            })

    }
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            console.log(window.localStorage)

            noteService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedNoteAppUser')
        setUser(null)
    }


    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            {user === null && (
                <Togglable buttonLabel='login'>
                    <LoginForm
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                    />
                </Togglable>

            )}
            {user !== null && (
                <Togglable buttonLabel='new note'>
                    <NoteForm
                        addNote={addNote}
                        newNote={newNote}
                        handleChangeNote={handleChangeNote}
                    />

                </Togglable>

            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
            </div>
            <ul>
                {notesToShow.map(notes =>
                    <Note key={notes.id} notes={notes} toggleImportance={() => toggleImportance(notes.id)}/>
                )}
            </ul>
            {user !== null && (
                <button onClick={handleLogout}>logout</button>
            )}
            <Footer/>
        </div>
    )

}
export default App;