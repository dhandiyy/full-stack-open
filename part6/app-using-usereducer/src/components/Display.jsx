import {useCounterValue} from "../CounterContext.jsx";

const Display = () => {
	const counter = useCounterValue()
	return <div>{counter}</div>
}
export default Display