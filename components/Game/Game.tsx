import { useEffect, useState } from 'react'
import { STATUS_IN_PROGRESS, STATUS_WINNER } from '../../constants'
import { randomIntFromRange } from '../../utils'
import { calculateStatus } from './utils'
import { Board, Players, Tile } from './components'
import { Splash } from '../Splash'
import { IPlayer, IPosition } from './types'

const initialPositions: IPosition[] = new Array(9).fill(0).map((_, i) => ({
  tileId: i,
  pieceId: 0
}))

const initialPlayers: IPlayer[] = [
  {
    name: 'You',
    isBot: false,
    piece: 1,
    playerId: 0
  },
  {
    name: 'Bot',
    isBot: true,
    piece: 2,
    playerId: 1
  }
]

export const Game = () => {
  const currentPlayerPieceId = 1

  const [positions, setPositions] = useState<IPosition[]>(initialPositions)
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)
  const [status, setStatus] = useState<string>(STATUS_IN_PROGRESS)
  const [highlightRow, setHighlightRow] = useState<number[]>([])

  const players = initialPlayers
  const availableTiles = positions.filter(({pieceId}) => !pieceId)

  useEffect(() => {
    const {isBot} = initialPlayers[currentPlayer]
    if (isBot) {
      const chosenId = randomIntFromRange(0, availableTiles.length - 1)
      const {tileId} = availableTiles[chosenId]

      setTimeout(() => setPlayerPosition(tileId, currentPlayer), 1000)
    }
  }, [currentPlayer])

  const setPlayerPosition = (tileIndex: number, player: number) => {
    const currentPositions = [...positions]
    const {piece} = players[player]
    currentPositions[tileIndex].pieceId = piece

    setPositions(currentPositions)
    const {status, row} = calculateStatus(currentPositions, currentPlayerPieceId)
    setStatus(status)
    setHighlightRow(row)

    if (status !== STATUS_IN_PROGRESS) return

    const nextPlayer = currentPlayer ? 0 : 1

    setCurrentPlayer(nextPlayer)
  }

  return (
    <Splash>
      <Players
        players={players}
        currentPlayer={currentPlayer}
        gameStatus={status}
      />
      <Board>
        {positions.map(({tileId, pieceId}) => <Tile
          key={tileId}
          tileId={tileId}
          isHighlighted={highlightRow.includes(tileId)}
          highlightColor={status === STATUS_WINNER ? '#00cd93' : '#fb687a'}
          activePiece={pieceId}
          onClick={(tileIndex: number) => setPlayerPosition(tileIndex, currentPlayer)} />
        )}
      </Board>
    </Splash>
  )
}
