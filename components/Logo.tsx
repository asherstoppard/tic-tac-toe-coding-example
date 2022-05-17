import React from 'react'
import styled from 'styled-components'

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`

export const Logo = () => <LogoText>Tic-<span>Tac</span>-Toe</LogoText>
