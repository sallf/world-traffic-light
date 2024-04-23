import { addPost, getPosts, getSearchParams } from '@world-traffic-light/utils'

export async function GET(request: Request) {
  // const formData = await request.formData()
  // console.log('formData :>> ', formData)
  const { country, product } = getSearchParams(request)
  if (!country || !product) return
  const res = await getPosts({ country, product })
  return Response.json(res)
}

export async function POST(request: Request) {
  const body = await request.json()
  const res = await addPost(body)
  return Response.json(res)
}
