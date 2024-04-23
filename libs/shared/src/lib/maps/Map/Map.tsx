'use client'

import mapboxgl from 'mapbox-gl'
import { useState, useEffect } from 'react'
import { buildMap } from './utils'

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FsbGYiLCJhIjoiY2x2YXlzZW9mMDM5YTJrbDQ2N3R3djk1eCJ9.xn1us-Rx1MhnfNbgLQ9dhQ'

const options = [
  {
    name: 'Land Cover FL',
    property: 'landcover',
    stops: [
      [0, '#E52828'],
      [50, '#E5E028'],
      [100, '#3CB22B'],
    ],
  },
]

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
  const [score, setScore] = useState(50)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    const map = buildMap(mapContainer, selectedProduct, setScore)
    setMap(map)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]) // only mapContainer

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={setMapContainer} className="map-container w-full h-full" />
}
