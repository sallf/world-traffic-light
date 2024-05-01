'use client'

import mapboxgl from 'mapbox-gl'
import { useState, useEffect, useRef } from 'react'
import { buildMap, getMatchExpression, handleClick } from './utils'
import { Country, Product, Scores } from '@world-traffic-light/utils'

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
  const [isReady, setIsReady] = useState(false)

  const mapRef = useRef<mapboxgl.Map | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    mapRef.current = buildMap(
      mapContainer,
      selectedProduct,
      onSelectCountry,
      onToggleModal,
      setIsReady
    )
    setMap(mapRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]) // only mapContainer

  useEffect(() => {
    if (!mapRef.current || !isReady) return
    mapRef.current.setPaintProperty(
      'country-boundaries',
      'fill-color',
      getMatchExpression(scores)
    )
    mapRef.current.on('click', 'country-boundaries', async (e) => {
      if (!mapRef.current) return
      await handleClick(
        e,
        mapRef.current,
        selectedProduct,
        onSelectCountry,
        onToggleModal
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores, isReady]) // only scores and isReady

  useEffect(() => {
    const getScores = async () => {
      await fetch(`/api/scores?product=${selectedProduct.id}`)
        .then((res) => res.json())
        .then((scores: Scores) => {
          setScores(scores.scores)
        })
    }
    getScores()
  }, [selectedProduct])

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={setMapContainer} className="map-container w-full h-full" />
}
