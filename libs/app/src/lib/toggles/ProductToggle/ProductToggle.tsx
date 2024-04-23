'use client'
import { products } from '@world-traffic-light/utils'
import { Item } from './Item'
import { useState } from 'react'

export const ProductToggle = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [selectedProduct, setSelectedProduct] = useState(products[0].id)

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="bg-slate-50 px-6 py-2 rounded-full flex gap-6 text-sm flex-wrap justify-center">
      {products.map((product) => (
        <Item
          key={product.id}
          name={product.name}
          isSelected={selectedProduct === product.id}
          onClick={() => {
            setSelectedProduct(product.id)
          }}
        />
      ))}
    </div>
  )
}
