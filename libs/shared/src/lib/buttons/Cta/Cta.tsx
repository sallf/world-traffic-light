import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSecondary?: boolean
}

export const Cta = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { children, isSecondary = false, ...rest } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <button
      {...rest}
      className={`${
        isSecondary
          ? 'bg-gray-600 hover:bg-gray-700'
          : 'bg-green-600 hover:bg-green-700'
      } text-white font-bold py-2 px-4 rounded`}
    >
      {children}
    </button>
  )
}
