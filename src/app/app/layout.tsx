import { Header } from '@world-traffic-light/app'
import { getScores } from '@world-traffic-light/utils'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AppLayout = async (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { children } = props

  // const scores = await getScores({ product: '001' })
  // console.log('scores :>> ', scores)

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
