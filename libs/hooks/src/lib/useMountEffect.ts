import { EffectCallback, useEffect } from 'react'

// https://stackoverflow.com/a/56767883/3550318
export const useMountEffect = (callback: EffectCallback) => {
  useEffect(callback, [])
}
