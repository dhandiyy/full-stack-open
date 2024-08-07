import { useState } from 'react'

const Button = ({eventHandler, text}) => <button onClick={eventHandler}>{text}</button>

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const total = bad+neutral+good;

    const chooseGood = () => {
        const newGood = good + 1;
        setGood(newGood);
    }

    const chooseNeutral = () => {
        const newNeutral = neutral + 1;
        setNeutral(newNeutral);
    }

    const chooseBad = () => {
        const newBad = bad + 1;
        setBad(newBad);
    }


    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" eventHandler={chooseGood}/>
            <Button text="neutral" eventHandler={chooseNeutral}/>
            <Button text="bad" eventHandler={chooseBad}/>

            <h1>statistic</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {good-bad/2}</p>
            <p>positive {(good/total)*100}%</p>
        </div>
    )
}

export default App