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

  async function grantAccess() {
    await window.navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: 1080, height: 720 }
    })

    setAccessStatus('granted')
  }

  return { accessStatus, grantAccess }
}
