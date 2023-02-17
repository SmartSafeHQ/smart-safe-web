import { useState, useEffect } from 'react'

export function useHasUserGrantedCameraAccess() {
  const [hasUserGrantedCameraAccess, setHasUserGrantedCameraAccess] = useState<
    boolean | null
  >(null)

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasUserGrantedCameraAccess(true))
      .catch(() => setHasUserGrantedCameraAccess(false))
  }, [])

  return { hasUserGrantedCameraAccess }
}
