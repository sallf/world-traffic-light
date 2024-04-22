import { Header } from '@world-traffic-light/app'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AppLayout = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { children } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default AppLayout
