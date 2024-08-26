import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('should render content', () => {
  const blog = {
    title: 'How to test components in React?',
    author: 'Marcelo Malacalza',
    url: 'https://someurl-for-blog.com',
    likes: 3,
  }

  render(<Blog blog={blog} />)
  screen.getByTestId('blog-title-author')
  expect(screen.queryByTestId('hide-section')).not.toBeInTheDocument()
})

// test('clicking the button calls event handler twice', async () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true,
//   }

//   const mockHandler = vi.fn()

//   render(<Blog note={note} toggleImportance={mockHandler} />)

//   const user = userEvent.setup()
//   const button = screen.getByText('make not important')
//   await user.click(button)
//   await user.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(2)
// })
