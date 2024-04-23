import { RHForm, Text, TextArea } from '@world-traffic-light/shared'
import { getCookie } from 'cookies-next'
import { AnyObject, number, object, string } from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { Country, Product } from '@world-traffic-light/utils'
import { FieldValues } from 'react-hook-form'

interface Props {
  product: Product
  country: Country
}

export const NewPost = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { product, country } = props

  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const handleSubmit = async (values: FieldValues) => {
    const user = getCookie('username')
    const id = uuidv4()
    const { comment, score } = values
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        country: country.id,
        product: product.id,
        score,
        comment,
        user,
      }),
    })
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  const validationSchema: AnyObject = object({
    score: number().typeError('Score is required.').required().min(0).max(100),
    comment: string(),
  })
  return (
    <RHForm
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="bg-white border-gray-200 rounded px-6 py-3 pr-6 border overflow-hidden relative flex flex-wrap"
    >
      <Text id="score" label="Score" placeholder="Enter score" type="number" />
      <TextArea id="comment" label="Comment" placeholder="Enter comment" />
    </RHForm>
  )
}
