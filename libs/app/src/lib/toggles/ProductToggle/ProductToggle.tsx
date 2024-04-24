'use client'
import { Product, products } from '@world-traffic-light/utils'
import { Item } from './Item'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  selectedProduct: Product
  onClick: (product: Product) => void
}

export const ProductToggle = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedProduct, onClick } = props

  // --------------------- ===
  //  REFS
  // ---------------------
  const listRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!listRef.current || !bgRef.current) return

    const children = listRef.current.children
    const i = products.findIndex((p) => p === selectedProduct)

    const listX = listRef.current.getBoundingClientRect().x
    const { width, x } = children[i].getBoundingClientRect()

    gsap.to(bgRef.current, {
      width: width + 24,
      x: x - listX,
      duration: 0.3,
    })
  }, [selectedProduct])

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="bg-slate-50 px-5 py-4 rounded-full relative flex items-center">
      <div
        className="bg-slate-200 absolute h-10 w-24 rounded-full -ml-3"
        ref={bgRef}
      />
      <div
        className="relative flex gap-6 text-sm flex-wrap justify-center"
        ref={listRef}
      >
        {products.map((product) => (
          <Item
            key={product.id}
            name={product.name}
            isSelected={selectedProduct === product}
            onClick={() => {
              onClick(product)
            }}
          />
        ))}
      </div>
    </div>
  )
}
