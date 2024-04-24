import { Product } from '@world-traffic-light/utils'

export const buildPopup = (
  name: string,
  score: number | string,
  selectedProduct: Product,
  onClick: (isActive: boolean) => void
) => {
  const div = document.createElement('div')
  div.className = 'text-center'

  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-1'
  button.innerText = 'See Details'
  button.addEventListener('click', (e) => {
    e.preventDefault()
    onClick(true)
  })

  const inner = `
  <div>
    <p class="text-2xl mb-0">${name}</p>
    <p>${selectedProduct.name} Score</p>
    <p class="text-4xl py-2">${score}</p>
  </div>`

  div.innerHTML = inner
  div.appendChild(button)
  return div
}
