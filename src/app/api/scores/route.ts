import {
  FetchScores,
  getScores,
  getSearchParams,
} from '@world-traffic-light/utils'

export async function GET(request: Request) {
  const { country, product } = getSearchParams(request)
  if (!product) return Response.error()
  const params: Partial<FetchScores> = { product }
  if (country) params.country = country
  const res = await getScores(params)
  return Response.json(res)
}
