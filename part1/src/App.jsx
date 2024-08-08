import {useState} from "react";

const Course = ({courses}) => {
    const totalExercise = (parts) => {
        return parts.reduce((total, part) => total + part.exercises, 0);
    }

    return(
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <div>
                    <h2 key={course.id}>{course.name}</h2>
                    {course.parts.map(part => (
                        <div key={part.id}>{part.name} {part.exercises}</div>
                    ))}
                    <p><strong>total of {totalExercise(course.parts)} exercise</strong></p>
                </div>
            ))}
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return(
        <div>
            <Course courses={courses} />
        </div>
    )
}

export default App