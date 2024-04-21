'use client'
import { RHForm, Text } from '@world-traffic-light/shared'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { FieldValues } from 'react-hook-form'
import { AnyObject, object, string } from 'yup'

export const LoginForm = () => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const router = useRouter()

  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const handleSubmit = async (values: FieldValues) => {
    setCookie('username', values.username)
    router.push('/app')
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  const validationSchema: AnyObject = object({
    username: string()
      .min(3, 'Username is too short')
      .required('Username is required'),
  })
  return (
    <RHForm validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Text id="username" label="Username" placeholder="Enter username" />
    </RHForm>
  )
}
