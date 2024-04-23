import { getPosts } from '@world-traffic-light/utils'
import { NextResponse } from 'next/server'

const getSearchParams = (request: Request) => {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const product = searchParams.get('product')
  return { country, product }
}

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
