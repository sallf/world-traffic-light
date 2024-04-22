'use client'

// @ts-expect-error seems to be an issue with mapbox-gl - package is installed
import mapboxgl from 'mapbox-gl' // this is installed
import { useState, useEffect } from 'react'

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

export const Map = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [lng, setLng] = useState(5)
  const [lat, setLat] = useState(34)
  const [zoom, setZoom] = useState(3)

  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  // const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      projection: 'mercator',
    })
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    })
    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        // data
      })

      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
          ],
        },
      ])

      map.addLayer(
        {
          id: 'countries',
          type: 'fill',
          source: 'countries',
        },
        'country-label'
      )

      // map.setPaintProperty('countries', 'fill-color', {
      //   property: active.property,
      //   stops: active.stops
      // });

      setMap(map)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]) // only mapContainer

  // --------------------- ===
  //  RENDER
  // ---------------------
  return <div ref={setMapContainer} className="map-container w-full h-full" />
}
