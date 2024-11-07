import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import App from './App'
import noteReducer, {createNote} from './reducers/noteReducer'
import filterReducer, {filterChange} from "./reducers/filterReducer.js";

/*
	Alur redux:
	1. reducer init - probe_unknown - init
	2. dispatch jika ada
	3. semua reducer akan jalan/reload, tapi hanya yg disuruh
	4. subscribe jika ada (dimanapun letaknya di file yang sama)
 */


const reducer = combineReducers({
	notes: noteReducer,
	filter: filterReducer
})
//output reducer berupa object dengan field notes dan filter



const store = createStore(reducer)
// console.log(store.getState()) //menghasilkan object dari dua reducer

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>

)