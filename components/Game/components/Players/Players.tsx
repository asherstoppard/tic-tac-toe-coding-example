import React, { FC } from 'react'
import styled from 'styled-components'
import { Player } from './Player'
import { IPlayer } from '../../types'

export interface IPlayersProps {
  currentPlayer: number
  gameStatus: string
  players: IPlayer[]
}

const PlayersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 0 2rem;
`

export const Players: FC<IPlayersProps> = ({ players, currentPlayer, gameStatus }) => (
  <PlayersContainer>
    {players.map(({ name, ...player}) => <Player {...player} key={name} name={name} currentPlayer={currentPlayer} gameStatus={gameStatus} />)}
  </PlayersContainer>
)
