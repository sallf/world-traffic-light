import { productById } from '@world-traffic-light/utils'

export const buildPopup = (
  name: string,
  score: number | string,
  selectedProduct: string
) => `
<div class="text-center">
  <p class="text-2xl mb-0">${name}</p>
  <p>${productById(selectedProduct)?.name} Score</p>
  <p class="text-4xl py-2">${score}</p>
  <button type="button" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-1">
    See Details
  </button>
</div>`
