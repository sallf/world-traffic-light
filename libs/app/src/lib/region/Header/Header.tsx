'use client'

import { KeyboardArrowDown } from '@mui/icons-material'
import { getCookie } from 'cookies-next'
import { useState } from 'react'
import { Bucket } from './Bucket/Bucket'

export const Header = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [isOpen, setIsOpen] = useState(false)

  // --------------------- ===
  //  RENDER
  // ---------------------
  const user = getCookie('username')
  return (
    <header className="relative w-full px-10 py-4 bg-slate-50 flex items-center justify-between">
      <h1 className="text-xl text-slate-900 font-black">LandOS</h1>
      <button
        className="flex items-center"
        onClick={() => {
          setIsOpen((p) => !p)
        }}
      >
        <span>{user}</span>
        <KeyboardArrowDown className={`w-4 ${isOpen ? '-scale-y-100' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-10 mt-1">
          <Bucket />
        </div>
      )}
    </header>
  )
}
