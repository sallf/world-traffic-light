import { Country, Product, Scores } from '@world-traffic-light/utils'
import mapboxgl from 'mapbox-gl'
import { buildPopup } from './popup'

const handleClick = async (
  e: mapboxgl.MapLayerMouseEvent,
  map: mapboxgl.Map,
  selectedProduct: Product,
  onSelectCountry: (country: Country) => void,
  onToggleModal: (isActive: boolean) => void
) => {
  if (!e.features?.[0]?.properties) return
  const country = e.features[0].properties.iso_3166_1_alpha_3 as string
  const name = e.features[0].properties.name_en as string

  onSelectCountry({ id: country, name })

  const popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setDOMContent(buildPopup(name, '...', selectedProduct, () => null))
    .addTo(map)

  const scores: Scores = await fetch(
    `/api/scores?country=${country}&product=${selectedProduct.id}`
  ).then((res) => res.json())

  const score = scores.scores[country] || 50

  popup.setDOMContent(
    buildPopup(name, score, selectedProduct, (isActive: boolean) => {
      onToggleModal(isActive)
      popup.remove()
    })
  )
  return scores.scores[country]
}

export const buildMap = (
  mapContainer: HTMLDivElement,
  selectedProduct: Product,
  onSelectCountry: (country: Country) => void,
  onToggleModal: (isActive: boolean) => void,
  scores: Scores['scores']
) => {
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [5, 34],
    zoom: 3,
    projection: { name: 'mercator' },
  })
  map.on('load', () => {
    // Add source for country polygons using the Mapbox Countries tileset
    // The polygons contain an ISO 3166 alpha-3 code which can be used to for joining the data
    // https://docs.mapbox.com/vector-tiles/reference/mapbox-countries-v1
    map.addSource('countries', {
      type: 'vector',
      url: 'mapbox://mapbox.country-boundaries-v1',
    })

    // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
    const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']]

    const colorStops = [
      [0, 'rgba(255, 0, 0, 1)'], // Red for score 0
      [50, 'rgba(255, 255, 0, 1)'], // Yellow for score 50
      [100, 'rgba(0, 255, 0, 1)'], // Green for score 100
    ]

    // // Calculate color values for each country
    Object.entries(scores).forEach(([code, score]) => {
      const color = 'rgba(0, 255, 0, 1)'
      console.log('color :>> ', code, score, color)
      matchExpression.push(code, color)
    })

    // default color for countries with no data
    matchExpression.push('rgba(0, 0, 0, 0.1)')

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
          'fill-color': matchExpression,
          // 'fill-color': '#149d4e',
          // 'fill-opacity': 0.4,
        },
      },
      'country-label'
    )

    map.on('mouseenter', 'country-boundaries', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'country-boundaries', () => {
      map.getCanvas().style.cursor = ''
    })

    map.on('click', 'country-boundaries', async (e) => {
      await handleClick(e, map, selectedProduct, onSelectCountry, onToggleModal)
    })
  })
  return map
}
