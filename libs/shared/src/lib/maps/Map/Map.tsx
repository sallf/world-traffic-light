import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useState, useRef, useEffect } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FsbGYiLCJhIjoiY2x2YXlzZW9mMDM5YTJrbDQ2N3R3djk1eCJ9.xn1us-Rx1MhnfNbgLQ9dhQ'

interface Props {}

export const Map = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  // --------------------- ===
  //  REFS
  // ---------------------
  const mapContainer = useRef(null)
  const map = useRef(
    new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
  )

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [])

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={mapContainer} className="map-container w-full h-52" />
}
