import { getPosts, getSearchParams } from '@world-traffic-light/utils'

export async function GET(request: Request) {
  // const formData = await request.formData()
  // console.log('formData :>> ', formData)
  const { country, product } = getSearchParams(request)
  if (!country || !product) return
  const res = await getPosts({ country, product })
  return Response.json(res)
}

// export async function POST(request: Request) {
//   const requestMethod = request.method;
//   const body = JSON.parse(request.body);

//   const body = await request.json()
//   const res = await getPosts({ country, ...body })
//   return Response.json(res)
// }
