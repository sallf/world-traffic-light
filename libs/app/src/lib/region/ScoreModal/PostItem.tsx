import { Post } from '@world-traffic-light/utils'
import { useState } from 'react'

interface Props {
  post: Post
}

export const PostItem = (prop: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { post } = prop
  const { score, comment, user } = post

  // --------------------- ===
  //  STATE
  // ---------------------
  const [isExpanded, setIsExpanded] = useState(false)

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="bg-white border-gray-200 rounded px-6 py-3 border overflow-hidden relative grid grid-cols-6">
      <div className="w-2 absolute top-0 bottom-0 left-0 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#ED6A5A] via-[#E0BA48] to-[#36C98F] w-52 h-full"
          style={{ left: `${score}%` }}
        />
      </div>
      <div className={`${isExpanded ? '' : 'truncate'}`}>{user}</div>
      <div className={`${isExpanded ? '' : 'truncate'}`}>{score}</div>
      <div className={`${isExpanded ? '' : 'truncate'} col-span-4 relative`}>
        {comment}
        <button
          className="absolute inset-0"
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span className="sr-only">Toggle</span>
        </button>
      </div>
    </div>
  )
}
