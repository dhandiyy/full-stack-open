import {render, screen} from "@testing-library/react";
import Note from './Note.jsx'
import userEvent from "@testing-library/user-event";

test('renders component', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	}

	//CARA2
	const {container} = render(<Note notes={note}/> )
	const div = container.querySelector('.note')
	screen.debug(div) //to print in terminal
	expect(div).toHaveTextContent('Component testing is done with react-testing-library')


	// CARA 1
	// render(<Note notes={note}/> )
	// const element = screen.getByText('Component testing is done with react-testing-library')
	// expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	}

	const mockHandler = vi.fn() //mock event handler
	render(<Note notes={note} toggleImportance={mockHandler}/>)

	const user = userEvent.setup()
	const button = screen.getByText('make not important')
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(1)

})