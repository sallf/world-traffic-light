import { MoreVert } from '@mui/icons-material'

export const MoreBtn = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="absolute right-0 top-0 bottom-0 w-6">
      <button
        type="button"
        className="w-full h-full flex items-center justify-center bg-gray-100 rounded hover:bg-gray-300"
      >
        <MoreVert />
      </button>
    </div>
  )
}
