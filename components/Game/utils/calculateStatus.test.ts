import { calculateStatus } from './calculateStatus'
import { IPosition } from '../types'
import {
  STATUS_LOSER,
  STATUS_WINNER,
  STATUS_IN_PROGRESS,
  STATUS_DRAW
} from '../../../constants'

const formatTilePositions = (pieces: number[]): IPosition[] => pieces.map((pieceId: number, tileId:number ): IPosition => ({ pieceId, tileId }))

describe('components › Game › utils › calculateStatus', () => {
  it(`sets status to "${STATUS_WINNER}" and outputs tile IDs when the current player gets a completed row or diagonal`, () => {
    const positions: IPosition[] = formatTilePositions([1, 1, 1, 0, 0, 0, 0, 0, 0])
    const currentPlayerPieceId: number = 1

    const { status, row } = calculateStatus(positions, currentPlayerPieceId)

    expect(status).toBe(STATUS_WINNER)
    expect(row).toEqual([0, 1, 2])
  })

  it(`sets status to "${STATUS_LOSER}" and outputs tile IDs when the other player gets a completed row or diagonal`, () => {
    const positions: IPosition[] = formatTilePositions([2, 2, 2, 0, 0, 0, 0, 0, 0])
    const currentPlayerPieceId: number = 1

    const { status, row } = calculateStatus(positions, currentPlayerPieceId)

    expect(status).toBe(STATUS_LOSER)
    expect(row).toEqual([0, 1, 2])
  })

  it(`sets status to ${STATUS_DRAW} when no playable tiles are available`, () => {
    const positions: IPosition[] = formatTilePositions([2, 2, 1, 1, 1, 2, 2, 1, 1])
    const currentPlayerPieceId: number = 1

    const { status, row } = calculateStatus(positions, currentPlayerPieceId)

    expect(status).toBe(STATUS_DRAW)
    expect(row).toEqual([])
  })

  it('sets status to inprogress when no status changes are required', () => {
    const positions: IPosition[] = formatTilePositions([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const currentPlayerPieceId: number = 1

    const { status, row } = calculateStatus(positions, currentPlayerPieceId)

    expect(status).toBe(STATUS_IN_PROGRESS)
    expect(row).toEqual([])
  })
})
