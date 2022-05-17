import React, { FC } from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyling = createGlobalStyle`
  body {
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    color: white;
    background: #24135d;
  }
`

export const Theme: FC = () => (
  <GlobalStyling />
)
