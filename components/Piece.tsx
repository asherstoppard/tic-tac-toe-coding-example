import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

export interface IPieceProps {
  pieceId: number,
  isHighlighted: boolean
}

const Piece1 = ({ fill = '#f8cb3f' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.11 178.11"><path style={{ fill }} d="M178.11,143.32a13.89,13.89,0,0,1-4.2,10.2l-20.39,20.39a14.47,14.47,0,0,1-20.39,0L89.05,129.83,45,173.91a13.89,13.89,0,0,1-10.2,4.2,13.85,13.85,0,0,1-10.19-4.2L4.2,153.52a14.47,14.47,0,0,1,0-20.39L48.27,89.05,4.2,45A13.89,13.89,0,0,1,0,34.78,13.88,13.88,0,0,1,4.2,24.59L24.59,4.2A13.85,13.85,0,0,1,34.78,0,13.89,13.89,0,0,1,45,4.2L89.05,48.27,133.13,4.2a14.47,14.47,0,0,1,20.39,0l20.39,20.39a13.88,13.88,0,0,1,4.2,10.19,13.89,13.89,0,0,1-4.2,10.2L129.83,89.05l44.08,44.08A13.88,13.88,0,0,1,178.11,143.32Z"/></svg>

const Piece2 = ({ fill = '#eb1a50' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path style={{ fill }} d="M90,51A39,39,0,1,1,51,90,39.05,39.05,0,0,1,90,51M90,0a90,90,0,1,0,90,90A90,90,0,0,0,90,0Z"/></svg>

const PieceContainer = styled.div<{ pieceId: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
`

export const Piece: FC<IPieceProps> = ({ isHighlighted, pieceId }) => {
  const pieces: ReactElement[] = [
    <Piece1 fill={isHighlighted ? 'white' : '#f8cb3f'} />,
    <Piece2 fill={isHighlighted ? 'white' : '#eb1a50'} />
  ]

  return (
    <PieceContainer pieceId={pieceId}>
      {pieces[pieceId]}
    </PieceContainer>
  )
}
