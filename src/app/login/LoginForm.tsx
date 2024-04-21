'use client'
import { RHForm, Text } from '@world-traffic-light/components'
import { AnyObject, object, string } from 'yup'

export const LoginForm = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  const validationSchema: AnyObject = object({
    username: string().required('Username is required'),
  })
  return (
    <RHForm
      validationSchema={validationSchema}
      onClick={() => {
        console.log('todo')
      }}
    >
      <Text id="username" label="Username" placeholder="Enter username" />
    </RHForm>
  )
}
