const Course = ({course}) => {
    const [totalExercises, setTotalExercises] = useState(0)

    return(
        <div>
            <h1>{course.name}</h1>
            <div>
                {course.parts.map(part =>
                    <p key={part.id}>{part.name} {part.exercises}</p>
                )}
                <p>total of {course.parts.map(part => part.exercises+part.exercises)}</p>
            </div>
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
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
            }
        ]
    }

    return <Course course={course} />
}

export default App