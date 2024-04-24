interface Props {
  name: string
  isSelected: boolean
  onClick: () => void
}

export const Item = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { name, isSelected, onClick } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <label
      onClick={onClick}
      className={`${
        isSelected ? 'font-semibold  text-slate-700' : 'text-black'
      } cursor-pointer font-lg`}
    >
      <input
        className="sr-only"
        type="radio"
        onChange={onClick}
        checked={isSelected}
      />
      <span>{name}</span>
    </label>
  )
}
