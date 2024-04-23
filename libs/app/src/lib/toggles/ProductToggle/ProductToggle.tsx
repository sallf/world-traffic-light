'use client'
import { Product, products } from '@world-traffic-light/utils'
import { Item } from './Item'

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
  //  RENDER
  // ---------------------
  return (
    <div className="bg-slate-50 px-6 py-2 rounded-full flex gap-6 text-sm flex-wrap justify-center">
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
  )
}
