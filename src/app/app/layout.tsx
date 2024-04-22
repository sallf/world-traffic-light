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
      <main className="h-full">{children}</main>
    </div>
  )
}

export default AppLayout
