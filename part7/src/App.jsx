import {useState} from "react";
import {BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";

const Home = () => (
    <div> <h2>TKTL notes app</h2> </div>
)

const Note = ({notes}) => {
    const id = useParams().id
    const note = notes.find(note => note.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important? 'important' : 'not important'}</strong></div>
        </div>

    )
}

const Notes = ({notes}) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const Users = () => (
    <div> <h2>Users</h2> </div>
)

const App = () => {
    const padding = {
        padding: 5
    }

    return (
        <Router>
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
            </div>

            <Routes>
                <Route path="/notes/:id" element={<Notes notes={notes}/>}/>
                <Route path="/notes" element={<Notes/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>

            <div>
                <i>Note app, Department of Computer Science 2024</i>
            </div>
        </Router>
    )
}
export default App