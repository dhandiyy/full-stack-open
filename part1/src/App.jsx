import {useState} from "react";

const Display = ({counter}) => <div>{counter}</div>
const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const App = () => {
    const [counter, setCounter] = useState(0)
    console.log('rendering with counter value', counter)

    const increaseByOne = () => {
        console.log('increasing, value before', counter)
        setCounter(counter + 1)
    }

    const decreaseByOne = () => {
        console.log('decreasing, value before', counter)
        setCounter(counter - 1)
    }

    const setToZero = () => {
        console.log('resetting to zero, value before', counter)
        setCounter(0)
    }

    return(
        <div>
            <Display counter={counter}/>
            <Button onSmash={increaseByOne} text="plus"/>
            <Button onSmash={setToZero} text="reset"/>
            <Button onSmash={decreaseByOne} text="minus"/>
        </div>
    )
}
export default App;