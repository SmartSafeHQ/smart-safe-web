/* eslint-disable no-undef */

import { useEffect, useState } from 'react'

type Props = {
  accessStatus: PermissionState
}

export function useListUsersCameraDevices({ accessStatus }: Props) {
  const [usersCameraDevices, setUsersCameraDevices] = useState({
    frontCameraId: '',
    backCameraId: ''
  })

  useEffect(() => {
    if (accessStatus !== 'denied') {
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
    }
  }, [accessStatus])

  return { usersCameraDevices }
}
