import { Logo } from './Logo'
import { render } from '@testing-library/react'

describe('components > Logo', () => {
  it('renders logo text as a h1 element', async () => {
    const { getByText } = render(<Logo />)

    expect(getByText('Tic-Tac-Toe')).toBeDefined()
  })
})
