'use client'

import { getPosts } from '@world-traffic-light/utils'
import mapboxgl from 'mapbox-gl'
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
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  // const [active, setActive] = useState(options[0]);
  const [, setMap] = useState<mapboxgl.Map | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    if (!mapContainer) return
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [5, 34],
      zoom: 3,
      projection: { name: 'mercator' },
    })
    map.on('load', () => {
      // map.addSource('countries', {
      //   type: 'geojson',
      //   // data
      // })

      // map.setLayoutProperty('country-label', 'text-field', [
      //   'format',
      //   ['get', 'name_en'],
      //   { 'font-scale': 1.2 },
      //   '\n',
      //   {},
      //   ['get', 'name'],
      //   {
      //     'font-scale': 0.8,
      //     'text-font': [
      //       'literal',
      //       ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
      //     ],
      //   },
      // ])

      // map.addLayer(
      //   {
      //     id: 'countries',
      //     type: 'fill',
      //     source: 'countries',
      //   },
      //   'country-label'
      // )

      map.addLayer(
        {
          id: 'country-boundaries',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.country-boundaries-v1',
          },
          'source-layer': 'country_boundaries',
          type: 'fill',
          paint: {
            'fill-color': '#149d4e',
            'fill-opacity': 0.4,
          },
        },
        'country-label'
      )

      map.on('mouseenter', 'country-boundaries', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      // map.setFilter('country-boundaries', [
      //   'in',
      //   'iso_3166_1_alpha_3',
      //   'NLD',
      //   'ITA',
      // ])

      map.on('click', 'country-boundaries', async (e) => {
        // const posts = await getPosts({
        //   country: e.features[0].properties.iso_3166_1_alpha_3,
        //   product: '001',
        // })
        if (!e.features?.[0]?.properties) return
        const country = e.features[0].properties.iso_3166_1_alpha_3
        const name = e.features[0].properties.name_en
        new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(name).addTo(map)

        const posts = await fetch(
          `/api/posts?country=${country}&product=001`
        ).then((res) => res.json())
        console.log('posts :>> ', posts)
      })

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
