import {useState} from "react";

const History = ({allClicks}) => {
    if (allClicks.length === 0) {
        return ( //conditional rendering
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {allClicks.join(` `)}
        </div>
    )
}

const Button = ({handleClicks, text}) => <button onClick={handleClicks}>{text}</button>
const Display = props => <div>{props.value}</div>


const App = () => {

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)
    const [value, setValue] = useState(0)


    const handleLeftClick = () => {
        setAllClicks(allClicks.concat('L'))
        const leftUpdate = left + 1
        setLeft(leftUpdate)
        setTotal(leftUpdate + right)
    }

    const handleRightClick = () => {
        setAllClicks(allClicks.concat('R'))
        const rightUpdate = right + 1
        setRight(rightUpdate)
        setTotal(rightUpdate + left)
    }

    //Function return function
    const setToValue = (value) => {
        console.log(`value now is ${value}`)
        setValue(value)
    }


    return(
        <div>
            {left}
            <Button text="left" handleClicks={handleLeftClick}/>
            <Button text="right" handleClicks={handleRightClick}/>
            {right}
            <div>
                <History allClicks={allClicks} />
            </div>
            <p>{total}</p>
            <Button text="Thousand" handleClicks={() => setToValue(1000)}/>
            <Button text="Increment" handleClicks={() => setToValue(value + 1)}/>
            <Button text="Reset" handleClicks={() => setToValue(0)}/>
            <Display value = {value}/>

        </div>
    )
}
export default App;