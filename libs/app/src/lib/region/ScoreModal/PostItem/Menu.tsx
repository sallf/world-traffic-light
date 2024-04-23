import { Post } from '@world-traffic-light/utils'

interface Props {
  post: Post
}

export const Menu = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { post } = props

  // --------------------- ===
  //  RENDER
  // ---------------------
  const btns = [
    {
      label: 'Edit',
      onClick: () => console.log('Edit'),
    },
    {
      label: 'Delete',
      onClick: async () => {
        await fetch(`/api/posts/${post.id}`, { method: 'DELETE' })
      },
    },
  ]
  return (
    <div className="bg-white border border-gray-200 shadow rounded p-2 flex flex-col absolute top-full mt-1 right-0 z-10">
      {btns.map((btn, i) => (
        <button
          key={i}
          onClick={btn.onClick}
          className="py-2 px-4 hover:bg-gray-100 rounded"
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
