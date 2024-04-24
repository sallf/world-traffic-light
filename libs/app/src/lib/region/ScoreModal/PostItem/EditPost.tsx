import { getCookie } from 'cookies-next'
import { v4 as uuidv4 } from 'uuid'
import { Country, Post, Product } from '@world-traffic-light/utils'
import { FieldValues } from 'react-hook-form'
import { useState } from 'react'
import { PostForm } from './PostForm'

interface Props {
  post: Post
  onComplete: () => void
}

export const EditPost = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { post, onComplete } = props

  // --------------------- ===
  //  STATE
  // ---------------------
  const [isLoading, setIsLoading] = useState(false)

  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const handleSubmit = async (values: FieldValues) => {
    const { comment, score } = values
    setIsLoading(true)
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        score,
        comment,
      }),
    })
    setIsLoading(false)
    onComplete()
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <>
      <p className="opacity-75 italic">Editing Post</p>
      <div className="border border-orange-400 rounded">
        <PostForm onSubmit={handleSubmit} isLoading={isLoading} post={post} />
      </div>
    </>
  )
}
