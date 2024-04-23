import { products } from '@world-traffic-light/utils'

interface Props {}

export const ProductSelect = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <form>
      <label
        htmlFor="product"
        className="block text-sm font-medium text-gray-700"
      >
        <span className="sr-only">Product</span>
        <select
          id="product"
          name="product"
          className="mt-1 block w-full pl-0 pr-10 py-2 text-base bg-slate-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {products.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}
