'use client'

import { Map } from '@world-traffic-light/shared'
import { ProductToggle } from '../../toggles'
import { products } from '@world-traffic-light/utils'
import { useState } from 'react'
import { ScoreModal } from '../ScoreModal/ScoreModal'

export const MapContainer = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [selectedProduct, setSelectedProduct] = useState(products[0].id)

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0">
        <Map selectedProduct={selectedProduct} />
      </div>
      <div className="absolute bottom-8">
        <ProductToggle
          selectedItem={selectedProduct}
          onClick={setSelectedProduct}
        />
      </div>
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 max-h-full">
        <ScoreModal />
      </div>
    </div>
  )
}
