import * as React from 'react'

import { LoginForm } from './LoginForm'

import bg from './bg.webp'
import Image from 'next/image'
import { Fingerprint } from '@mui/icons-material'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-5 relative">
      <Image
        src={bg}
        alt=""
        className="w-full h-full object-cover opacity-10 absolute"
      />
      <div className="relative bg-white rounded-md shadow-md px-14 py-10 w-[30rem] max-w-[90%]">
        <h1 className="font-light text-4xl mb-8 text-center">
          Welcome to LandOS
        </h1>
        <Fingerprint className="w-10 h-10 mb-2 mx-auto block fill-green-600" />
        <LoginForm />
      </div>
    </div>
  )
}
