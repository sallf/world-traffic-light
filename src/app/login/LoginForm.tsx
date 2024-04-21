'use client'
import { RHForm, Text } from '@world-traffic-light/components'
import { setCookie } from 'cookies-next'
import { FieldValues } from 'react-hook-form'
import { AnyObject, object, string } from 'yup'

export const LoginForm = () => {
  // --------------------- ===
  //  HANDLERS
  // ---------------------
  async function handleSubmit(values: FieldValues) {
    setCookie('username', values.username)
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
