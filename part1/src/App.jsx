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

const App = () => {

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)


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

    return(
        <div>
            {left}
            <button onClick={handleLeftClick} className="btn btn-primary">
                left
            </button>
            <button onClick={handleRightClick} className="btn btn-primary">
                right
            </button>
            {right}
            <div>
                <History allClicks={allClicks} />
            </div>
            <p>{total}</p>
        </div>
    )
}
export default App;