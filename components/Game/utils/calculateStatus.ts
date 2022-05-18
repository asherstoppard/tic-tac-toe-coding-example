import { STATUS_DRAW, STATUS_IN_PROGRESS, STATUS_LOSER, STATUS_WINNER } from '../../../constants'
import { IPosition, IStatus, TLines } from '../types'

export const calculateStatus = (positions: IPosition[], currentPlayerPieceId: number): IStatus => {
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
    const line = lines[i];
    const linePieces = line.map(lineId => positions[lineId].pieceId)
    const [firstPiece] = linePieces

    if (linePieces.every(pieceId => pieceId && pieceId === firstPiece)) {
      return { status: currentPlayerPieceId === firstPiece ? STATUS_WINNER : STATUS_LOSER, row: lines[i] };
    }
  }

  return { status: positions.every(({ pieceId }) => pieceId) ? STATUS_DRAW : STATUS_IN_PROGRESS, row: [] };
};
