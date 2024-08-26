import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText('Blog title...')
  const authorInput = screen.getByPlaceholderText('Blog author...')
  const urlInput = screen.getByPlaceholderText('Blog url...')
  const sendButton = screen.getByText('Create')

  const newBlog = {
    title: 'How to test components in React?',
    author: 'Marcelo Malacalza',
    url: 'https://someurl-for-blog.com',
  }

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls[0][0])
  expect(addBlog.mock.calls[0][0]).toStrictEqual(newBlog)
})
