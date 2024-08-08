import Note from "./components/Note.jsx";

const App = ({notes}) => {
    const result = notes.map((note) => note.id)
    console.log(result)

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(notes =>
                    <Note key={notes.id} notes={notes} />
                )}
            </ul>
        </div>
    )

}
export default App;