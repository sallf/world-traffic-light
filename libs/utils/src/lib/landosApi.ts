import { buildRequest, handleFetch } from './fetchUtils'
import { EditPost, FetchPosts, FetchScores, Post } from './types'

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://coverage-mapper-2rca5acexa-uc.a.run.app/'

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

export async function editPost(params: EditPost) {
  const request = buildRequest(
    apiUrl,
    `posts`,
    {
      ...params,
    },
    {
      method: 'PUT',
    }
  )
  return await handleFetch(request)
}

export async function deletePost(params: EditPost) {
  const request = buildRequest(
    apiUrl,
    `posts`,
    {
      ...params,
    },
    {
      method: 'DELETE',
    }
  )
  return await handleFetch(request)
}

export async function getScores(params: FetchScores) {
  const request = buildRequest(apiUrl, `scores`, {
    ...params,
  })
  // request.body.next.tags = [params.country, params.product]
  console.log('request :>> ', request)
  return await handleFetch(request)
}
