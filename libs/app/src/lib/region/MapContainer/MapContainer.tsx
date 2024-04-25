'use client'

import { Map } from '@world-traffic-light/shared'
import { ProductToggle } from '../../toggles'
import { Country, products } from '@world-traffic-light/utils'
import { useEffect, useRef, useState } from 'react'
import { ScoreModal } from '../ScoreModal/ScoreModal'

import gsap from 'gsap'

const duration = 0.3

export const MapContainer = () => {
  // --------------------- ===
  //  STATE
  // ---------------------
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [isActive, setIsActive] = useState(false)

  const [modalContent, setModalContent] = useState<HTMLDivElement | null>(null)
  const [modalBg, setModalBg] = useState<HTMLDivElement | null>(null)

  const [key, setKey] = useState(0)

  // --------------------- ===
  //  REFS
  // ---------------------
  const tl = useRef<gsap.core.Timeline | null>(null)

  // --------------------- ===
  //  EFFECTS
  // ---------------------
  useEffect(() => {
    // Build TL
    if (!modalContent || !modalBg) return
    tl.current = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(modalBg, { display: 'block' })
        gsap.set(modalContent, { display: 'block' })
      },
      onReverseComplete: () => {
        gsap.set(modalBg, { display: 'none' })
        gsap.set(modalContent, { display: 'none' })
      },
    })

    tl.current.to(modalBg, { autoAlpha: 0.5, duration })
    tl.current.to(
      modalContent,
      {
        translateX: '0%',
        duration,
      },
      0
    )
  }, [modalContent, modalBg])

  useEffect(() => {
    // Handle modal visibility
    const handleClickOutside = (e: MouseEvent) => {
      if (modalContent && !modalContent.contains(e.target as Node)) {
        setIsActive(false)
      }
    }
    if (isActive) {
      tl.current?.play()
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      tl.current?.reverse()
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]) // only isActive

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0">
        <Map
          key={key} // cheap reset
          selectedProduct={selectedProduct}
          onSelectCountry={setSelectedCountry}
          onToggleModal={setIsActive}
        />
      </div>
      <div className="absolute bottom-8">
        <ProductToggle
          selectedProduct={selectedProduct}
          onClick={setSelectedProduct}
        />
      </div>
      <div
        className="absolute inset-0 bg-black hidden opacity-0"
        ref={setModalBg}
      />
      <div
        className={`absolute -left-4 top-20 bottom-10 -translate-x-full max-h-full hidden max-w-[calc(100%-2rem)]`}
        ref={setModalContent}
      >
        <ScoreModal
          key={key} // cheap reset
          selectedCountry={selectedCountry}
          selectedProduct={selectedProduct}
          isActive={isActive}
          onClose={() => {
            setIsActive(false)
          }}
          incKey={() => setKey((prev) => prev + 1)} // cheap reset
        />
      </div>
    </div>
  )
}
