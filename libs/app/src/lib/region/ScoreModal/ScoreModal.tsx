'use client'

import { Add, Close } from '@mui/icons-material'
import { Country, Post, Product } from '@world-traffic-light/utils'
import { Gauge } from '../../typography'
import { ProductSelect } from './ProductSelect'
import { useEffect, useState } from 'react'
import { Cta } from '@world-traffic-light/shared'
import { PostItem } from './PostItem'

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
    getPosts()
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
          <Gauge score={50.123} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-12">
        <p className="text-xl">Scores</p>
        <Cta onClick={() => console.log('View all scores')}>
          <span className="flex gap-1 items-center">
            <Add className="w-6 h-6" />
            <span>Add Score</span>
          </span>
        </Cta>
      </div>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
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
