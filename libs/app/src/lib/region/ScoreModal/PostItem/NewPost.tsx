import { getCookie } from 'cookies-next'
import { v4 as uuidv4 } from 'uuid'
import { Country, Product } from '@world-traffic-light/utils'
import { FieldValues } from 'react-hook-form'
import { useState } from 'react'
import { PostForm } from './PostForm'

interface Props {
  product: Product
  country: Country
  onComplete: () => void
}

export const NewPost = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { product, country, onComplete } = props

  // --------------------- ===
  //  STATE
  // ---------------------
  const [isLoading, setIsLoading] = useState(false)

  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const handleSubmit = async (values: FieldValues) => {
    const user = getCookie('username')
    const id = uuidv4()
    const { comment, score } = values
    setIsLoading(true)
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        id,
        country: country.id,
        product: product.id,
        score,
        comment,
        user,
      }),
    })
    setIsLoading(false)
    onComplete()
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
}
