const Hello = ({name, age}) => { //it's component
    //props is an object, remember that!

    // destructuring:
    // 1.
    // const name = props.name;
    // const age = props.age;
    // 2.
    // const {age, name} = props

    //ini adalah fungsi dalam fungsi, benar bukan?ya!
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello world from Hello(). and this value of props: {name} and {age}</p>
            <p>So you probably born in {bornYear()}</p>
        </div>
    )
}

const App = () => { //it's component too
    const now = new Date();
    const name = `dhandi`
    const age = 17
    const person = [
        {name: 'peter', age: 20},
        {name: 'john', age: 21},
    ]
    return (
        <div>
            <p>Hello world, it is {now.toString()}</p>
            <Hello name={name} age={age} />
            {/*cant render object, but fine if just one data*/}
            <p>{person[1].name}</p>
        </div>
    )
}

export default App