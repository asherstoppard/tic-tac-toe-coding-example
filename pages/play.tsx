import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Board, Theme, Tile } from '../components'

interface IPosition {
  tileId: number;
  pieceId: number
}

const initialPositions: IPosition[] = new Array(9).fill(0).map((_, i) => ({
  tileId: i,
  pieceId: 0
}))

export interface IInitialPlayer {
  name: string
  piece: number,
  isBot: boolean
}

const initialPlayers: IInitialPlayer[] = [
  {
    name: 'Asher',
    isBot: false,
    piece: 1
  },
  {
    name: 'Bot',
    isBot: true,
    piece: 2
  }
]

const Player = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`

const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

type TLine = number[]

type TLines = TLine[]

interface IStatus {
  status: string
  row: TLine
}

const calculateStatus = (positions: IPosition[], currentPlayerPieceId: number): IStatus => {
  const lines: TLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    const { pieceId: pieceIdA } = positions[a]
    const { pieceId: pieceIdB } = positions[b]
    const { pieceId: pieceIdC } = positions[c]

    if (pieceIdA && pieceIdA === pieceIdB && pieceIdA === pieceIdC) {
      return { status: currentPlayerPieceId === pieceIdA ? 'winner' : 'loser', row: lines[i] };
    }
  }

  return { status: positions.every(({ pieceId }) => pieceId) ? 'draw' : 'inprogress', row: [] };
};

const PlayPage = () => {
  const currentPlayerPieceId = 1

  const [positions, setPositions] = useState<IPosition[]>(initialPositions)
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)
  const [status, setStatus] = useState<string>('inprogress')
  const [highlightRow, setHighlightRow] = useState<number[]>([])

  const players = initialPlayers
  const currentMove = players[currentPlayer]
  const availableTiles = positions.filter(({ pieceId }) => !pieceId)

  useEffect(() => {
    const { isBot } = initialPlayers[currentPlayer]
    if (isBot) {
      const chosenId = randomIntFromInterval(0, availableTiles.length - 1)
      const { tileId } = availableTiles[chosenId]

      setPlayerPosition(tileId, currentPlayer)
    }
  }, [currentPlayer])

  const setPlayerPosition = (tileIndex: number, player: number) => {
    const currentPositions = [...positions]
    const { piece } = players[player]
    currentPositions[tileIndex].pieceId = piece

    setPositions(currentPositions)
    const { status, row } = calculateStatus(currentPositions, currentPlayerPieceId)
    setStatus(status)
    setHighlightRow(row)

    if (status !== 'inprogress') return

    const nextPlayer = currentPlayer ? 0 : 1

    setCurrentPlayer(nextPlayer)
  }

    return (
      <>
        <Theme />
        {status === 'draw' && <p>Draw!</p>}
        {status === 'winner' && <p>You Win!</p>}
        {status === 'loser' && <p>You Lose!</p>}
        <Board>
          {positions.map(({ tileId, pieceId }) => <Tile
            key={tileId}
            tileId={tileId}
            isHighlighted={highlightRow.includes(tileId)}
            highlightColor={status === 'winner' ? '#26cf76': '#e02a37'}
            activePiece={pieceId} onClick={(tileIndex: number) => setPlayerPosition(tileIndex, currentPlayer)}/>
          )}
        </Board>
        <Player>
          {currentMove.name}
          {currentMove.isBot && 'bot'}
        </Player>
      </>
    )
}

export default PlayPage
