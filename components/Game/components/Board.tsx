import styled from 'styled-components'

export const Board = styled.div`
  width: 100%;
  display: grid;
  max-width: 500px;
  grid-template-columns: calc(33.333% - 0.666rem) calc(33.333%  - 0.666rem) calc(33.333% - 0.666rem);
  grid-gap: 1rem;
`
