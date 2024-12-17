import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { NewNote, Note } from "./types";
import { createNote, getAllNotes } from "./noteService";
// import { CoursePart } from "./types";

function App() {
    const [newNote, setNewNote] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);

    // const courseName = "Half stack application development";
    // const courseParts: CoursePart[] = [
    //     {
    //         name: "Fundamentals",
    //         exerciseCount: 10,
    //         description: "This is an awesome course part",
    //         kind: "basic",
    //     },
    //     {
    //         name: "Using props to pass data",
    //         exerciseCount: 7,
    //         groupProjectCount: 3,
    //         kind: "group",
    //     },
    //     {
    //         name: "Basics of type Narrowing",
    //         exerciseCount: 7,
    //         description: "How to go from unknown to string",
    //         kind: "basic",
    //     },
    //     {
    //         name: "Deeper type usage",
    //         exerciseCount: 14,
    //         description: "Confusing description",
    //         backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    //         kind: "background",
    //     },
    // ];

    // const assertNever = (value: never): never => {
    //     throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    // };

    // courseParts.forEach((part) => {
    //     switch (part.kind) {
    //         case "basic":
    //             console.log(part.name, part.description, part.exerciseCount);
    //             break;
    //         case "group":
    //             console.log(part.name, part.exerciseCount, part.groupProjectCount);
    //             break;
    //         case "background":
    //             console.log(part.name, part.exerciseCount, part.backgroundMaterial);
    //             break;
    //         default:
    //             return assertNever(part);
    //     }
    // });

    useEffect(() => {
        getAllNotes().then((data) => {
            setNotes(data);
        });
    }, []);

    const noteCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // const noteToAdd = {
        // 	content: newNote,
        // 	id: String(notes.length + 1)
        // }
        createNote({ content: newNote }).then((data) => {
            setNotes(notes.concat(data));
        });
        // setNotes(notes.concat(noteToAdd));
        setNewNote("");
    };

    return (
        <div>
            <form onSubmit={noteCreation}>
                <input
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                />
                <button type="submit">add</button>
            </form>
            <h3>Notes</h3>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
