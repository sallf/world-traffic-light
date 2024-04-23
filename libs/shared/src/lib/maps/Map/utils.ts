import { Scores } from '@world-traffic-light/utils'
import mapboxgl from 'mapbox-gl'
import { buildPopup } from './popup'

const handleClick = async (
  e: mapboxgl.MapLayerMouseEvent,
  map: mapboxgl.Map,
  selectedProduct: string
) => {
  if (!e.features?.[0]?.properties) return
  const country = e.features[0].properties.iso_3166_1_alpha_3
  const name = e.features[0].properties.name_en

  const popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(buildPopup(name, '...', selectedProduct))
    .addTo(map)

  const scores: Scores = await fetch(
    `/api/scores?country=${country}&product=${selectedProduct}`
  ).then((res) => res.json())

  const score = scores.scores[country] || 50

  popup.setHTML(buildPopup(name, score, selectedProduct))
  return scores.scores[country]
}

export const buildMap = (
  mapContainer: HTMLDivElement,
  selectedProduct: string
) => {
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [5, 34],
    zoom: 3,
    projection: { name: 'mercator' },
  })
  map.on('load', () => {
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

    map.on('click', 'country-boundaries', async (e) => {
      await handleClick(e, map, selectedProduct)
    })
  })
  return map
}
