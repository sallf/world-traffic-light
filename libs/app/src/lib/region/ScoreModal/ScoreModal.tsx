interface Props {
  isActive: boolean
}

export const ScoreModal = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { isActive } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div
      className={`${
        isActive ? '' : '-translate-x-full'
      } transition-transform bg-slate-50 rounded-md p-8 pl-12 h-full overflow-y-auto w-[32rem] max-w-full`}
    >
      <p className="text-3xl">Brazil</p>
    </div>
  )
}
