import { ProductToggle } from '@world-traffic-light/app'
import { Map } from '@world-traffic-light/shared'

const AppPage = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0">
        <Map />
      </div>
      <div className="absolute bottom-8">
        <ProductToggle />
      </div>
    </div>
  )
}

export default AppPage
