import { buildRequest, handleFetch } from './fetchUtils'
import { FetchPosts, FetchScores, Post } from './types'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export async function addPost(params: Post) {
  const request = buildRequest(
    apiUrl,
    `posts`,
    {
      ...params,
    },
    {
      method: 'POST',
    }
  )
  return await handleFetch(request)
}

export async function getPosts(params: FetchPosts) {
  const request = buildRequest(apiUrl, `posts`, { ...params })
  return await handleFetch(request)
}

export async function editPost(id: string, params: Partial<Post>) {
  const request = buildRequest(
    apiUrl,
    `posts/${id}`,
    {
      ...params,
    },
    {
      method: 'PUT',
    }
  )
  return await handleFetch(request)
}

export async function deletePost(id: string) {
  const request = buildRequest(
    apiUrl,
    `posts/${id}`,
    {},
    {
      method: 'DELETE',
    }
  )
  return await handleFetch(request)
}

export async function getScores(params: Partial<FetchScores>) {
  const request = buildRequest(apiUrl, `scores`, {
    ...params,
  })

  return await handleFetch(request)
}
