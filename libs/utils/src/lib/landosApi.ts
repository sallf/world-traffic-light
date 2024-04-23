import { apis, buildRequest, handleFetch } from './fetchUtils'
import { EditPost, FetchPosts, FetchScores, Post } from './types'

export async function addPost(params: Post) {
  const request = buildRequest(
    apis.landos,
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
  const request = buildRequest(apis.landos, `posts`, { ...params })
  return await handleFetch(request)
}

export async function editPost(params: EditPost) {
  const request = buildRequest(
    apis.landos,
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
    apis.landos,
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
  const request = buildRequest(apis.landos, `scores`, {
    ...params,
  })
  return await handleFetch(request)
}
