import Note from "./components/Note.jsx";
import {useEffect, useRef, useState} from "react";
import noteService from "./services/note.js";
import Notification from "./components/Notification.jsx";
import loginService from "./services/login.js"
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";
import NoteForm from "./components/NoteForm.jsx";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await noteService.getAll();
                console.log("Fetched notes:", fetchedNotes);
                setNotes(fetchedNotes);
            } catch (error) {
                console.error("Error fetching notes:", error);
                setErrorMessage("Failed to fetch notes. Please try again later.");
            }
        };
        fetchNotes();
    }, []);

    //event.target -> object HTMLnya (DOM) dari komponen yang menggunakan event ini. ex: form and input
    const addNote = async (noteObject) => {
        noteFormRef.current.toggleVisibility()
        try {
            const createdNote = await noteService.create(noteObject);
            setNotes(notes.concat(createdNote));
        } catch (error) {
            console.error("Error creating note: ", error)
            setErrorMessage("Failed to create note. Please try again.")
        }
    }

    const toggleImportance = async (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        try {
            const updatedNote = await noteService.update(id, changedNote);
            setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
        } catch (error) {
            setErrorMessage(`Note '${note.content}' was already removed from server`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            setNotes(notes.filter((n) => n.id !== id));
        }
    };

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const handleLogin = async (userObject) => {
        try {
            const user = await loginService.login(userObject)
            setUser(user)

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            noteService.setToken(user.token)
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
                        login={handleLogin}
                    />
                </Togglable>

            )}
            {user !== null && (
                <Togglable buttonLabel='new note' ref={noteFormRef}>
                    <NoteForm
                        createNote={addNote}
                    />
                </Togglable>

            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
            </div>
            <ul>
                {notesToShow.map((notes, i) =>
                    <Note key={i} notes={notes} toggleImportance={() => toggleImportance(notes.id)}/>
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