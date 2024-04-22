import { ButtonHTMLAttributes } from 'react'

export const Cta = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { children, ...rest } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <button
      {...rest}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  )
}
