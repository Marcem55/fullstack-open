import { render, screen, fireEvent } from '@testing-library/react'
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

test('clicking the button show/hide elements', async () => {
  const blog = {
    title: 'How to test components in React?',
    author: 'Marcelo Malacalza',
    url: 'https://someurl-for-blog.com',
    likes: 3,
  }

  render(<Blog blog={blog} />)

  const button = screen.getByText('view')
  // Using fireEvent (before I used userEvent but is not needed here)
  fireEvent.click(button)

  expect(screen.queryByTestId('hide-section')).toBeInTheDocument()
  fireEvent.click(button)
  expect(screen.queryByTestId('hide-section')).not.toBeInTheDocument()
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'How to test components in React?',
    author: 'Marcelo Malacalza',
    url: 'https://someurl-for-blog.com',
    likes: 3,
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
