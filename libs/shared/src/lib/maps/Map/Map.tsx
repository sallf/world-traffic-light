'use client'

import mapboxgl from 'mapbox-gl'
import { useState, useEffect } from 'react'
import { buildMap } from './utils'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Props {
  selectedProduct: string
}

export const Map = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedProduct } = props

  // --------------------- ===
  //  STATE
  // ---------------------
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  const [, setMap] = useState<mapboxgl.Map | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    const map = buildMap(mapContainer, selectedProduct)
    setMap(map)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]) // only mapContainer

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={setMapContainer} className="map-container w-full h-full" />
}
