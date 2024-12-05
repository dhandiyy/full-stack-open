import {useState} from "react";
import {
	BrowserRouter as Router,
	Link,
	Navigate,
	Route,
	Routes,
	useMatch,
	useNavigate,
	useParams
} from "react-router-dom";

const Home = () => (
	<div>
		<h2>TKTL notes app</h2>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
			industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
			scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
			electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
			Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
			Aldus PageMaker including versions of Lorem Ipsum.
		</p>
	</div>
)

const Login = (props) => {
	const navigate = useNavigate()

	const onSubmit = (event) => {
		event.preventDefault()
		props.onLogin('dhandi1')
		navigate("/")

	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<div>
					username: <input type="text"/>
				</div>
				<div>
					password <input type="password"/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

const Note = ({note}) => {
	// const id = useParams().id
	// const note = notes.find(note => note.id === Number(id))
	return (
		<div>
			<h2>{note.content}</h2>
			<div>{note.user}</div>
			<div><strong>{note.important ? 'important' : 'not important'}</strong></div>
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
	<div>
		<h2>TKTL notes app</h2>
		<ul>
			<li>Matti Luukkainen</li>
			<li>Juha Tauriainen</li>
			<li>Arto Hellas</li>
		</ul>
	</div>
)

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'HTML is easy',
			important: true,
			user: 'Matti Luukkainen'
		},
		{
			id: 2,
			content: 'Browser can execute only JavaScript',
			important: false,
			user: 'Matti Luukkainen'
		},
		{
			id: 3,
			content: 'Most important methods of HTTP-protocol are GET and POST',
			important: true,
			user: 'Arto Hellas'
		}
	])

	const [user, setUser] = useState(null)

	const onLogin = (user) => {
		setUser(user)
	}

	const onLogout = () => {
		setUser(null)
	}

	const padding = {
		padding: 5
	}

	//to get specific note according their ids
	const match = useMatch('/notes/:id')
	const note = match
		? notes.find(note => note.id === Number(match.params.id))
		: null

	return (
		<div>
			<div>
				<Link style={padding} to="/">home</Link>
				<Link style={padding} to="/notes">notes</Link>
				<Link style={padding} to="/users">users</Link>
				{user
					? <div>
						<em>{user} logged in</em>
						<button onClick={onLogout}>Log out</button>
					</div>
					: <Link style={padding} to="/login">login</Link>}
			</div>

			<Routes>
				<Route path="/notes/:id" element={<Note note={note}/>}/>
				<Route path="/notes" element={<Notes notes={notes}/>}/>
				<Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
				<Route path="/login" element={<Login onLogin={onLogin}/>}/>
				<Route path="/" element={<Home/>}/>
			</Routes>

			<footer>
				<br/>
				<i>Note app, Department of Computer Science 2024</i>
			</footer>
		</div>
	)
}
export default App