import React, { FC } from 'react'
import styled, { css } from 'styled-components'

const Status = styled.div`
  display: block;
`

const PlayerContainer = styled.div`
  background: #222745;
  width: calc(50% - 2.5rem);
  text-align: left;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  
  ${({ isActive }) => isActive && css`
    border: 1px solid #00cd93;
    
    ${Status} {
      color: #00cd93;
    }
  `}
  
  ${({ isLoser }) => isLoser && css`
    border: 1px solid #fb687a;

    ${Status} {
      color: #fb687a;
    }
  `}
`

export interface IPlayerProps {
  name: string
  piece: number
  isBot: boolean
  playerId: number
  currentPlayer: number
  gameStatus: string
}

const Avatar = styled.div`
  overflow: hidden;
  border-radius: 50%;
  margin-right: 1rem;
  width: 50px;
  height: 50px;
`

const loserStatus = {
  status: 'loser',
  statusLabel: 'Loser'
}

const winnerStatus = {
  status: 'winner',
  statusLabel: 'Winner'
}

const drawStatus = {
  status: 'winner',
  statusLabel: 'Draw'
}

const getPlayerStatus = (gameStatus, isBot, playerId, currentPlayer) => {
  if (gameStatus === 'loser' && !isBot || gameStatus === 'winner' && isBot) return loserStatus
  if (gameStatus === 'winner' && !isBot || gameStatus === 'loser' && isBot) return winnerStatus
  if (gameStatus === 'draw') return drawStatus
  if (currentPlayer === playerId)
    return isBot ? { status: 'winner', statusLabel: 'Thinking...' } : { status: 'winner', statusLabel: 'Your Move' }

  return {}
}

export const Player: FC<IPlayerProps> = ({ name, playerId, isBot, currentPlayer, gameStatus }) => {
  const { status, statusLabel } = getPlayerStatus(gameStatus, isBot, playerId, currentPlayer)

  return (
    <PlayerContainer isActive={status === 'winner'} isLoser={status === 'loser'}>
      <Avatar>
        <img src="//placekitten.com/50/50" alt=""/>
      </Avatar>
      <p>
        <strong>{name}</strong>
        <Status>{statusLabel}</Status>
      </p>
    </PlayerContainer>
  )
}
