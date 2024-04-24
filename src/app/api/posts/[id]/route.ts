import { deletePost, editPost } from '@world-traffic-light/utils'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await deletePost(params.id)
  return Response.json(res)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const res = await editPost(params.id, {
    score: body.score,
    comment: body.comment,
  })
  return Response.json(res)
}
