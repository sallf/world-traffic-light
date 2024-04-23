import { RHForm, Text, TextArea } from '@world-traffic-light/shared'
import { AnyObject, object, string } from 'yup'

interface Props {}

export const NewPost = () => {
  const handleSubmit = async (values: any) => {
    console.log(values)
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  const validationSchema: AnyObject = object({
    score: string().required('Score is required'),
    comment: string().required('Comment is required'),
  })
  return (
    <RHForm
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="bg-white border-gray-200 rounded px-6 py-3 pr-6 border overflow-hidden relative flex flex-wrap"
    >
      <Text id="score" label="Score" placeholder="Enter score" />
      <TextArea id="comment" label="Comment" placeholder="Enter comment" />
    </RHForm>
  )
}
