'use client'

import { Map } from '@world-traffic-light/shared'
import { ProductToggle } from '../../toggles'
import { Country, products } from '@world-traffic-light/utils'
import { useState } from 'react'
import { ScoreModal } from '../ScoreModal/ScoreModal'

export const MapContainer = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [selectedProduct, setSelectedProduct] = useState(products[0].id)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [isActive, setIsActive] = useState(false)

  console.log('isActive :>> ', isActive)

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0">
        <Map
          selectedProduct={selectedProduct}
          onSelectCountry={setSelectedCountry}
          onToggleModal={setIsActive}
        />
      </div>
      <div className="absolute bottom-8">
        <ProductToggle
          selectedItem={selectedProduct}
          onClick={setSelectedProduct}
        />
      </div>
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 max-h-full">
        <ScoreModal isActive={isActive} />
      </div>
    </div>
  )
}
