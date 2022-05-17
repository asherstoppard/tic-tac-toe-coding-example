import styled from 'styled-components'

export const Board = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: grid;
  max-width: 700px;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 1rem;
`
