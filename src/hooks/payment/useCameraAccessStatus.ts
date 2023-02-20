/* eslint-disable no-undef */

import { useState, useEffect } from 'react'

export function useCameraAccessStatus() {
  const [accessStatus, setAccessStatus] = useState<PermissionState>('prompt')

  useEffect(() => {
    const cameraPermission = 'camera' as PermissionName

    window.navigator.permissions
      .query({ name: cameraPermission })
      .then(({ state }) => setAccessStatus(state))
      .catch(() => setAccessStatus('denied'))
  }, [])

  async function grantAccess(usersCameraDevices: {
    frontCameraId: string
    backCameraId: string
  }) {
    await window.navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: 323, // width and height are needed, otherwise the video stream will not start on mobile
        height: 634,
        deviceId:
          usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId
      }
    })

    setAccessStatus('granted')
  }

  return { accessStatus, grantAccess }
}
