import { useState } from 'react'

const Button = ({eventHandler, text}) => <button onClick={eventHandler}>{text}</button>

const StatisticLine = ({text, value}) => {
    if(text === "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}</td>
                <td>%</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}


const Statistics = ({total, good, bad, neutral}) => {
    if (total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={bad+neutral+good}/>
            <StatisticLine text="average" value={good-bad / 2}/>
            <StatisticLine text="positive" value={(good / total) * 100}/>
        </div>
    )
}

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
            <h1>statistics</h1>
            <Statistics total={total} good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App