'use client'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const AppPage = () => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const router = useRouter()

  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const handleClick = () => {
    deleteCookie('username')
    router.push('/login')
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div>
      <button onClick={handleClick}>Log Out</button>
    </div>
  )
}

export default AppPage
