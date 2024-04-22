'use client'

import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const Header = () => {
  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const router = useRouter()
  const handleClick = () => {
    deleteCookie('username')
    router.push('/login')
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <header className="w-full px-10 py-4 bg-slate-50 flex items-center justify-between">
      <h1 className="text-xl text-slate-900 font-black">LandOS</h1>
      <div>
        user <button onClick={handleClick}>Log Out</button>
      </div>
    </header>
  )
}
