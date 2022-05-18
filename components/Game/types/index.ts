export type TLine = number[]

export type TLines = TLine[]


export interface IPlayer {
  name: string
  piece: number
  isBot: boolean
  playerId: number
}

export interface IPosition {
  tileId: number;
  pieceId: number
}

export interface IStatus {
  status: string
  row: TLine
}
