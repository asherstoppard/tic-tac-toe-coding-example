import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Piece } from '../Piece'

export interface ITileProps {
  activePiece: number
  onClick: (tileIndex: number) => void
  tileId: number
  isHighlighted?: boolean
  highlightColor?: string
}


const TileButton = styled.button<{ isHighlighted: boolean, highlightColor: string, hasPiece: number }>`
  position: relative;
  background: #414679;
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  appearance: none;
  cursor: pointer;
  transition: ease-in-out 0.5s;
  border: 1px solid #414679;
  
  ${({ hasPiece }) => !hasPiece && css`
    &:hover,
    &:focus {
      background: #464f87;
      border: 1px solid #00c08c;
    }

    &:active {
      transform: scale(1);
    }
  `}
  
  ${({ isHighlighted, highlightColor }) => isHighlighted && css`
    background: ${highlightColor};
  `}
`

export const Tile: FC<ITileProps> = ({ activePiece, isHighlighted, highlightColor, tileId, onClick }) => (
  <TileButton onClick={() => !activePiece && onClick(tileId)} isHighlighted={isHighlighted} highlightColor={highlightColor} hasPiece={activePiece}>
    {activePiece ? <Piece pieceId={activePiece - 1} isHighlighted={isHighlighted} /> : null}
  </TileButton>
)
