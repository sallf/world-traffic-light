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

  // async function getScores() {
  //   const res = await fetch(`${process.env.VITE_API_URL}/scores?product=001`, {
  //     method: 'GET',
  //     headers: {
  //       'X-API-Key': process.env.VITE_API_KEY,
  //     },
  //   })
  //   return res.json()
  // }

  const scores = await getScores({ product: '001' })
  console.log('scores :>> ', scores)

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
