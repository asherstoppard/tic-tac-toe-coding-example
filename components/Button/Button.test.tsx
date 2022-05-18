import { Button } from './Button'
import { render } from '@testing-library/react'

const label: string = '__BUTTON_LABEL__'

describe('components > Button', () => {
  it('renders given children', async () => {
    const { getByText } = render(<Button>{label}</Button>)

    expect(getByText(label)).toBeDefined()
  })
})
