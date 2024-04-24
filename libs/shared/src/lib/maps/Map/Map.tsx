'use client'

import mapboxgl from 'mapbox-gl'
import { useState, useEffect } from 'react'
import { buildMap } from './utils'
import { Country, Product, Scores } from '@world-traffic-light/utils'
import { useMountEffect } from '@world-traffic-light/hooks'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Props {
  selectedProduct: Product
  onSelectCountry: (country: Country) => void
  onToggleModal: (isActive: boolean) => void
}

export const Map = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { selectedProduct, onSelectCountry, onToggleModal } = props

  // --------------------- ===
  //  STATE
  // ---------------------
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  const [, setMap] = useState<mapboxgl.Map | null>(null)
  const [scores, setScores] = useState<Scores['scores']>({})

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    const map = buildMap(
      mapContainer,
      selectedProduct,
      onSelectCountry,
      onToggleModal
    )
    setMap(map)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer, selectedProduct, scores]) // only mapContainer, selectedProduct, and scores

  useMountEffect(() => {
    const getScores = async () => {
      await fetch(`/api/scores?product=${selectedProduct.id}`)
        .then((res) => res.json())
        .then((scores: Scores) => {
          setScores(scores.scores)
        })
    }
    getScores()
  })

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={setMapContainer} className="map-container w-full h-full" />
}
