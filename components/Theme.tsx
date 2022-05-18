import { FC } from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyling = createGlobalStyle`
  body {
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    color: white;
    background: #343b66;
    background: -moz-linear-gradient(top,  #343b66 0%, #222745 100%);
    background: -webkit-linear-gradient(top,  #343b66 0%,#222745 100%);
    background: linear-gradient(to bottom,  #343b66 0%,#222745 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#343b66', endColorstr='#222745',GradientType=0 );
    height: 100vh;
  }
`

export const Theme: FC = () => (
  <GlobalStyling />
)
