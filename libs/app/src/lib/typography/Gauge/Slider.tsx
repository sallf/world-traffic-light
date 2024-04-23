interface Props {
  score: number
}

export const Slider = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { score } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="w-full h-2 rounded-full relative bg-gradient-to-r from-[#ED6A5A] via-[#E0BA48] to-[#36C98F] flex items-center">
      <div
        className="absolute w-1 h-4 bg-black rounded-full shadow-md"
        style={{
          left: `${score}%`,
        }}
      />
    </div>
  )
}
