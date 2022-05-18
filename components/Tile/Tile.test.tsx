import { render } from '@testing-library/react'
import { Tile } from './Tile'

const noop = () => {}

describe('initial test', () => {
  it('does a thing', async () => {
    const { container } = await render(<Tile tileId={0} activePiece={0} onClick={noop} />)
    expect(container).toBeDefined()
  })
})
