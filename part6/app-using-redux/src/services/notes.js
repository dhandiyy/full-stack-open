import axios from "axios";

const url = 'http://localhost:3001/notes'

const getAll = async () => {
	const response = await axios.get(url)
	return response.data
}

const createNew = async (content) => {
	const object = {
		content,
		import: false
	}
	const response = await axios.post(url, object)
	return response.data

}

export default {getAll, createNew}