import { Post } from '@world-traffic-light/utils'
import { useEffect, useState } from 'react'
import { MoreBtn } from './MoreBtn'
import { getCookie } from 'cookies-next'
import { Menu } from './Menu'

interface Props {
  post: Post
  isMenuActive: boolean
  isEditing: boolean
  onMoreClick: () => void
  onEditClick: () => void
}

export const PostItem = (prop: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { post, isMenuActive, isEditing, onMoreClick, onEditClick } = prop
  const { score, comment, user } = post

  const currentUser = getCookie('username')

  // --------------------- ===
  //  STATE
  // ---------------------
  const [isTruncated, setIsTruncated] = useState(true)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (isMenuActive) {
      document.addEventListener('click', onMoreClick)
      return () => {
        document.removeEventListener('click', onMoreClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuActive]) // Only isMenuActive

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="relative">
      <div
        className={`bg-white rounded px-6 py-3 pr-6 border overflow-hidden relative grid grid-cols-6 ${
          isEditing ? 'border-orange-400' : 'border-gray-200'
        }`}
      >
        <div className="w-2 absolute top-0 bottom-0 left-0 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#ED6A5A] via-[#E0BA48] to-[#36C98F] w-52 h-full"
            style={{
              transform: `translateX(-${score}%)`,
              marginLeft: `${0.5 * (score / 100)}rem`,
            }}
          />
        </div>
        <div className={`${isTruncated ? 'truncate' : ''}`}>{user}</div>
        <div className={`${isTruncated ? 'truncate' : ''}`}>{score}</div>
        <div className={`${isTruncated ? 'truncate' : ''} col-span-4 relative`}>
          {comment}
          <button
            className="absolute inset-0"
            type="button"
            onClick={() => setIsTruncated((prev) => !prev)}
          >
            <span className="sr-only">Toggle</span>
          </button>
        </div>
        {currentUser === user && (
          <MoreBtn onClick={onMoreClick} isActive={isMenuActive} />
        )}
      </div>
      {isMenuActive && <Menu post={post} onEditClick={onEditClick} />}
    </div>
  )
}
