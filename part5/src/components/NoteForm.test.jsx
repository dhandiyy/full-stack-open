import {render, screen} from "@testing-library/react";
import NoteForm from "./NoteForm.jsx";
import userEvent from "@testing-library/user-event";

describe('<NoteForm />', () => {
	test('updates parent state and calls onSubmit', async () => {
		const createNote = vi.fn()
		const user = userEvent.setup()

		render(<NoteForm createNote={createNote}/>)
		// ini cara lain
		// const { container } = render(<NoteForm createNote={createNote} />)

		const input = screen.getByRole('textbox') //if input component more than 1 it will cause error

		//using id to get input
		// const input = container.querySelector('#note-input')
		const sendButton = screen.getByText('save')

		await user.type(input, 'testing a form...')
		await user.click(sendButton)

		expect(createNote.mock.calls).toHaveLength(1)
		//createNote.mock.calls -> [ [ { content: 'testing a form...', important: true } ] ]
		expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
	})


})