export type Product = { id: string; name: string }

export const products: Product[] = [
  {
    id: '001',
    name: 'Land Cover FL',
  },
  {
    id: '002',
    name: 'Land Eligibility FL',
  },
  {
    id: '003',
    name: 'ARR Scoping Report',
  },
  {
    id: '004',
    name: 'REDD Scoping Report',
  },
  {
    id: '005',
    name: 'ARR Eligibility Fast',
  },
]

export const productById = (id: string) =>
  products.find((product) => product.id === id)

export const productByName = (name: string) =>
  products.find((product) => product.name === name)
