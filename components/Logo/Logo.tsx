import styled from 'styled-components'

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`

export const Logo = () => <LogoText data-testid="main-logo">Tic-Tac-Toe</LogoText>
