import { useEffect, useState } from 'react'

export function useListUsersCameraDevices() {
  const [usersCameraDevices, setUsersCameraDevices] = useState({
    frontCameraId: '',
    backCameraId: ''
  })

  useEffect(() => {
    window.navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        const findCameraType = (kind: 'user' | 'back') => {
          return (device: MediaDeviceInfo) =>
            device.kind === 'videoinput' &&
            device.label.toLowerCase().includes(kind)
        }

        const backCamera = devices.find(findCameraType('back'))
        const frontCamera = devices.find(findCameraType('user'))

        setUsersCameraDevices({
          backCameraId: backCamera?.deviceId || '',
          frontCameraId: frontCamera?.deviceId || ''
        })
      })
      .catch(console.error)
  }, [])

  return { usersCameraDevices }
}
