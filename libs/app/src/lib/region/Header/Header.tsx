'use client'

import { KeyboardArrowDown } from '@mui/icons-material'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { Bucket } from './Bucket/Bucket'

export const Header = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    // This fixes hydration issue
    setUser(getCookie('username') || '')
  }, [])

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <header className="relative w-full px-10 py-4 bg-slate-50 flex items-center justify-between z-10">
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
