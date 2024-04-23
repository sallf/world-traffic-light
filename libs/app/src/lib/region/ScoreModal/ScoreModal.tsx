import { Close } from '@mui/icons-material'
import { Country } from '@world-traffic-light/utils'

interface Props {
  selectedCountry: Country | null
  onClose: () => void
}

export const ScoreModal = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedCountry, onClose } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div
      className={`bg-slate-50 relative rounded-md p-10 pl-12 h-full overflow-y-auto w-[38rem] max-w-full`}
    >
      <p className="text-3xl">{selectedCountry?.name}</p>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 hover:bg-slate-200 p-2 rounded-md"
      >
        <Close className="w-6 h-6" />
      </button>
    </div>
  )
}
