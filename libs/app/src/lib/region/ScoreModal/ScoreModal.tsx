import { Country } from '@world-traffic-light/utils'

interface Props {
  selectedCountry: Country | null
}

export const ScoreModal = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedCountry } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div
      className={`bg-slate-50 rounded-md p-8 pl-12 h-full overflow-y-auto w-[32rem] max-w-full`}
    >
      <p className="text-3xl">{selectedCountry?.name}</p>
    </div>
  )
}
