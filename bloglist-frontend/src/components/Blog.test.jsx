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

test('clicking the button show/hide elements', async () => {
  const blog = {
    title: 'How to test components in React?',
    author: 'Marcelo Malacalza',
    url: 'https://someurl-for-blog.com',
    likes: 3,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.queryByTestId('hide-section')).toBeInTheDocument()
  await user.click(button)
  expect(screen.queryByTestId('hide-section')).not.toBeInTheDocument()
})
