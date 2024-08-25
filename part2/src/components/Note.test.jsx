import { render, screen } from '@testing-library/react'
import Note from './Note'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('should render content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  //   render(<Note note={note} />)
  //   const element = screen.getByText(
  //     'Component testing is done with react-testing-library'
  //   )
  //   expect(element).toBeDefined()

  //   const { container } = render(<Note note={note} />)
  //   const div = container.querySelector('.note')
  //   expect(div).toHaveTextContent(
  //     'Component testing is done with react-testing-library'
  //   )

  //* BETTER WAY, MORE CONSISTENT, using data-testid attribute in the component (see component Note)
  render(<Note note={note} />)
  //   screen.debug() // show the HTML after render
  screen.getByTestId('note-component-test')
})

test('clicking the button calls event handler twice', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
