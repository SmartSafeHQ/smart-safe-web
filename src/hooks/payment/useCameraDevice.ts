import { useEffect, useState } from 'react'

import { useCameraAccessStatus } from './useCameraAccessStatus'
import { useListUsersCameraDevices } from './useListUsersCameraDevices'

export function useCameraDevice() {
  const { accessStatus, grantAccess } = useCameraAccessStatus()
  const { usersCameraDevices } = useListUsersCameraDevices({ accessStatus })

  const [isAppReadyToDisplayVideoStream, setIsAppReadyToDisplayVideoStream] =
    useState(
      Boolean(
        accessStatus === 'granted' &&
          (usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId)
      )
    )

  useEffect(() => {
    if (
      accessStatus === 'granted' &&
      (usersCameraDevices.backCameraId || usersCameraDevices.frontCameraId)
    ) {
      setIsAppReadyToDisplayVideoStream(true)
    } else {
      setIsAppReadyToDisplayVideoStream(false)
    }
  }, [accessStatus, usersCameraDevices])

  return {
    isAppReadyToDisplayVideoStream,
    grantAccess,
    accessStatus,
    usersCameraDevices
  }
}
