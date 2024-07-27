const Hello = (props) => { //it's component
    console.log(props)
    return (
        <div>
            <p>Hello world from Hello(). and this value of props: {props.name} and {props.age}</p>
        </div>
    )
}

const App = () => { //it's component too
    const now = new Date();
    const name = `dhandi`
    const age = 17
    const person = [
        {name: 'peter', age: 20},
        {name: 'pen', age: 21},
    ]
    return (
        <div>
            <p>Hello world, it is {now.toString()}</p>
            <Hello name="adam" age={20}/>
            <Hello name={name} age={age} />
            {/*cant render object, but fine if just one data*/}
            <p>{person[1].name}</p>
        </div>
    )
}

export default App