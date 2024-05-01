import { Country, Product, Scores } from '@world-traffic-light/utils'
import mapboxgl, { Expression } from 'mapbox-gl'
import { buildPopup } from './popup'

import Color from 'color'

const red = '#ED6A5A'
const yellow = '#E0BA48'
const green = '#36C98F'

const popups: mapboxgl.Popup[] = []

const getColor = (score: number) => {
  if (score < 50) {
    const color = Color(red)
    const color2 = Color(yellow)
    return color.mix(color2, score / 50).string()
  } else {
    const color = Color(yellow)
    const color2 = Color(green)
    return color.mix(color2, (score - 50) / 50).string()
  }
}

export const getMatchExpression = (scores: Scores['scores']) => {
  const matchExpression: Expression = ['match', ['get', 'iso_3166_1_alpha_3']]

  Object.entries(scores).forEach(([code, score]) => {
    const color = getColor(score)
    matchExpression.push(code, color)
  })

  // default color for countries with no data
  matchExpression.push(yellow)
  return matchExpression
}

export const handleClick = async (
  e: mapboxgl.MapLayerMouseEvent,
  map: mapboxgl.Map,
  selectedProduct: Product,
  onSelectCountry: (country: Country) => void,
  onToggleModal: (isActive: boolean) => void
) => {
  if (!e.features?.[0]?.properties) return
  if (popups.length) popups.forEach((popup) => popup.remove())
  const country = e.features[0].properties.iso_3166_1_alpha_3 as string
  const name = e.features[0].properties.name_en as string

  onSelectCountry({ id: country, name })

  const popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setDOMContent(buildPopup(name, '...', selectedProduct, () => null))
    .addTo(map)

  popups.push(popup)

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
  setIsReady: (isReady: boolean) => void
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
          'fill-color': yellow,
          'fill-opacity': 0.65,
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

    setIsReady(true)
  })
  return map
}
