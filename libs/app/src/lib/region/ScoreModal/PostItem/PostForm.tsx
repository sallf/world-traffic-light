import { AnyObject, object, number, string } from 'yup'
import { RHForm, Text, TextArea } from '@world-traffic-light/shared'
import { FieldValues } from 'react-hook-form'
import { Post } from '@world-traffic-light/utils'

interface Props {
  onSubmit: (values: FieldValues) => void
  isLoading: boolean
  post?: Post
}

export const PostForm = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { onSubmit, isLoading, post } = props

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
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="bg-white border-gray-200 rounded px-6 py-3 pr-6 border overflow-hidden relative flex flex-wrap"
    >
      <Text
        id="score"
        label="Score"
        placeholder="Enter score"
        type="number"
        defaultValue={post?.score}
      />
      <TextArea
        id="comment"
        label="Comment"
        placeholder="Enter comment"
        defaultValue={post?.comment}
      />
    </RHForm>
  )
}
