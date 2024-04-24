import { getScores, getSearchParams } from '@world-traffic-light/utils'

export async function GET(request: Request) {
  const { country, product } = getSearchParams(request)
  if (!country || !product) return
  const res = await getScores({ country, product })
  return Response.json(res)
}
