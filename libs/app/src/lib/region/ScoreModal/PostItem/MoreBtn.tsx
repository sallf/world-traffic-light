import { MoreVert } from '@mui/icons-material'

interface Props {
  onClick: () => void
  isActive: boolean
}

export const MoreBtn = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { onClick, isActive } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="absolute right-0 top-0 bottom-0 w-6">
      <button
        type="button"
        className={`w-full h-full flex items-center justify-center rounded hover:bg-gray-300 ${
          isActive ? 'bg-gray-300' : 'bg-gray-100'
        }`}
        onClick={onClick}
      >
        <MoreVert />
      </button>
    </div>
  )
}
