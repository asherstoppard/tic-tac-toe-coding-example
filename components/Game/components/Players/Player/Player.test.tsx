import { Player, IPlayerProps } from './Player'
import { render } from '@testing-library/react'
import { IPlayer } from '../../../types'
import {
  STATUS_DRAW,
  STATUS_WINNER,
  STATUS_LOSER
} from '../../../../../constants'

const name: string = '__NAME__'

const player: IPlayer = {
  isBot: false,
  piece: 1,
  playerId: 1,
  name
}

const baseProps: IPlayerProps = {
  ...player,
  currentPlayer: 1,
  gameStatus: 'inprogress'
}

describe('components > Button', () => {
  it('renders player names', async () => {
    const { getByText } = render(<Player {...baseProps} />)
    expect(getByText(name)).toBeVisible()
  })

  it('renders player names', async () => {
    const { getByTestId } = render(<Player {...baseProps} />)
    expect(getByTestId('player--avatar')).toBeVisible()
  })

  it(`displays "${STATUS_WINNER}" status`, async () => {
    const { getByText } = render(<Player {...baseProps} gameStatus={STATUS_WINNER} />)
    expect(getByText('Winner')).toBeVisible()
  })

  it(`displays "${STATUS_LOSER}" status`, async () => {
    const { getByText } = render(<Player {...baseProps} gameStatus={STATUS_LOSER} />)
    expect(getByText('Loser')).toBeVisible()
  })

  it(`displays "${STATUS_DRAW}" status`, async () => {
    const { getByText } = render(<Player {...baseProps} gameStatus={STATUS_DRAW} />)
    expect(getByText('Draw')).toBeVisible()
  })
})
