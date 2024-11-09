import {useReducer} from "react";

const counterReducer = (state, action) => {
	switch (action.type){
		case "INC":
			return state + 1
		case "DEC":
			return state -1
		case "ZERO":
			return 0
		default:
			return state

	}
}

const Display = ({counter}) => {
	return <div>{counter}</div>
}

const Button = ({dispatch, type, label}) => {
	return(
		<button onClick={() => dispatch({type})}>{label}</button>
	)
}

const App = () => {
	const [counter, counterDispatch] = useReducer(counterReducer, 0)

	return (
		<div>
			<Display counter={counter}/>
			<div>
				<Button type="INC" label="+" dispatch={counterDispatch}/>
				<Button type="DEC" label="-" dispatch={counterDispatch}/>
				<Button type="ZERO" label="0" dispatch={counterDispatch}/>
			</div>
		</div>
	)
}

export default App