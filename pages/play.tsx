import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Board, Players, Splash, Theme, Tile } from '../components'

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
  piece: number
  isBot: boolean
  playerId: number
}

const initialPlayers: IInitialPlayer[] = [
  {
    name: 'Asher',
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
  const availableTiles = positions.filter(({ pieceId }) => !pieceId)

  useEffect(() => {
    const { isBot } = initialPlayers[currentPlayer]
    if (isBot) {
      const chosenId = randomIntFromInterval(0, availableTiles.length - 1)
      const { tileId } = availableTiles[chosenId]

      setTimeout(() => setPlayerPosition(tileId, currentPlayer), 1000)
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
        <Splash>
          <Players
            players={players}
            currentPlayer={currentPlayer}
            gameStatus={status}
          />
          <Board>
            {positions.map(({ tileId, pieceId }) => <Tile
              key={tileId}
              tileId={tileId}
              isHighlighted={highlightRow.includes(tileId)}
              highlightColor={status === 'winner' ? '#00cd93': '#fb687a'}
              activePiece={pieceId} onClick={(tileIndex: number) => setPlayerPosition(tileIndex, currentPlayer)}/>
            )}
          </Board>
        </Splash>
      </>
    )
}

export default PlayPage
