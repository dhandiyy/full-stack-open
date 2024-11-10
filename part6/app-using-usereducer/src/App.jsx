import Display from "./components/Display.jsx";
import Button from "./components/Button.jsx";

const App = () => {

	return (
		<div>
			<Display/>
			<div>
				<Button type="INC" label="+"/>
				<Button type="DEC" label="-"/>
				<Button type="ZERO" label="0"/>
			</div>
		</div>
	)
}

export default App