import { Slider } from './Slider'

interface Props {
  score: number
}

export const Gauge = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { score } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="text-center">
      <p className="font-bold text-5xl mb-2">{score.toFixed(2)}</p>
      <Slider score={score} />
    </div>
  )
}
