import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import noteService from "./services/notes.js"
import {setNotes} from "./reducers/noteReducer.js";


// const CounterReducer = (state = 0, action) => { //this is root reducer function
// 	switch (action.type) {
// 		case 'INCREMENT':
// 			return state + 1
// 		case 'DECREMENT' :
// 			return state - 1
// 		case 'ZERO' :
// 			return 0
// 		default:
// 			return state
// 	}
// }
//
// //There should only be a single store in your app
// const store = createStore(CounterReducer) //reducer only using like this
//
// store.subscribe(() => { //it will execute when the state changes or dispatching
// 	const storeNow = store.getState()
// 	console.log(storeNow)
// })

//note: when the state changes, react not automatically render


const App = () => {
	const dispatch = useDispatch()

	//using data from database
	useEffect(() => {
		noteService.getAll().then(note => {
			dispatch(setNotes(note))
		})

	}, []);
	return (
		<div>
			<NewNote/>
			<VisibilityFilter/>
			<Notes/>
		</div>
	)

}

export default App