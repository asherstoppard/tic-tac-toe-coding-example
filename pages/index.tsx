import { FC } from 'react'
import { Button, Logo, Splash, Theme } from '../components'

const HomePage: FC = () => (
  <>
    <Theme />
    <Splash>
      <Logo />
      <Button href="/play">Let's Play!</Button>
    </Splash>
  </>
)

export default HomePage
