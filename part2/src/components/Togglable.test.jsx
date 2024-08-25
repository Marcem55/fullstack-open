import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeEach, describe, expect, test } from 'vitest'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = screen.getByTestId('togglable-content')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = screen.getByTestId('togglable-content')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    screen.debug()
    await user.click(button)
    screen.debug()

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)
    screen.debug()

    const div = screen.getByTestId('togglable-content')
    expect(div).toHaveStyle('display: none')
  })
})
