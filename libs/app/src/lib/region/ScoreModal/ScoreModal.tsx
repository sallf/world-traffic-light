'use client'

import { Add, Close } from '@mui/icons-material'
import { Country, Post, Product } from '@world-traffic-light/utils'
import { Gauge } from '../../typography'
import { ProductSelect } from './ProductSelect'
import { useEffect, useState } from 'react'
import { Cta } from '@world-traffic-light/shared'
import { PostItem } from './PostItem/PostItem'
import { NewPost } from './PostItem/NewPost'

interface Props {
  selectedCountry: Country | null
  selectedProduct: Product
  isActive: boolean
  onClose: () => void
}

export const ScoreModal = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedCountry, selectedProduct, isActive, onClose } = props

  // --------------------- ===
  //  STATE
  // ---------------------
  const [localProduct, setLocalProduct] = useState(selectedProduct)
  const [posts, setPosts] = useState<Post[]>([])
  const [activeItemMenu, setActiveItemMenu] = useState(-1) // index, -1 means no active item
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [score, setScore] = useState(50)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    setLocalProduct(selectedProduct)
  }, [selectedProduct])

  useEffect(() => {
    if (!selectedCountry || !localProduct || !isActive) return
    const getPosts = async () => {
      await fetch(
        `/api/posts?country=${selectedCountry.id}&product=${localProduct.id}`
      )
        .then((res) => res.json())
        .then((p) => {
          setPosts(p.posts as Post[])
        })
    }
    const getScores = async () => {
      await fetch(
        `/api/scores?country=${selectedCountry.id}&product=${localProduct.id}`
      )
        .then((res) => res.json())
        .then((scores) => {
          setScore(scores.scores[selectedCountry.id] || 50)
        })
    }
    getPosts()
    getScores()
  }, [localProduct, selectedCountry, isActive])

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div
      className={`bg-slate-50 relative rounded-md p-10 pl-12 h-full overflow-y-auto w-[42rem] max-w-full flex flex-col gap-4`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-3xl">{selectedCountry?.name}</p>
          <ProductSelect product={localProduct} setProduct={setLocalProduct} />
        </div>
        <div className="w-32">
          <Gauge score={score} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-12">
        <p className="text-xl">Scores</p>
        <Cta
          isSecondary={isAddingPost}
          onClick={() => {
            setIsAddingPost((prev) => !prev)
          }}
        >
          <span className="flex gap-1 items-center">
            <Add
              className={`w-6 h-6 transition-transform ${
                isAddingPost ? 'rotate-45' : 'rotate-0'
              }`}
            />
            <span>{isAddingPost ? 'Cancel' : 'Add Score'}</span>
          </span>
        </Cta>
      </div>
      <div className="flex flex-col gap-2">
        {isAddingPost && selectedCountry && (
          <NewPost product={localProduct} country={selectedCountry} />
        )}
        {posts.map((post, i) => (
          <PostItem
            key={post.id}
            post={post}
            isMenuActive={i === activeItemMenu}
            onMenuClick={() => {
              if (i === activeItemMenu) {
                setActiveItemMenu(-1)
              } else {
                setActiveItemMenu(i)
              }
            }}
          />
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 hover:bg-slate-200 p-2 rounded-md"
      >
        <Close className="w-6 h-6" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}
