/* eslint-disable no-undef */

import { useState, useEffect } from 'react'

import { MobileBridgeCommunication } from '@decorators/MobileBridgeCommunication'

/**
 * This shouldn't be directly used. Instead, use `useCameraDevice` hook.
 */
export function useCameraAccessStatus() {
  const [accessStatus, setAccessStatus] = useState<PermissionState>('prompt')

  useEffect(() => {
    const cameraPermission = 'camera' as PermissionName

    if ('permissions' in window.navigator) {
      console.log('asking permission when `permissions` API is available...')
      window.navigator.permissions
        .query({ name: cameraPermission })
        .then(({ state }) => setAccessStatus(state))
        .catch(() => setAccessStatus('denied'))
    } else {
      console.log(
        '`permissions` API is not available. Trying to call `cameraAccess()`'
      )

      const mobileBridgeCommunication = MobileBridgeCommunication.initialize()

      const permission = mobileBridgeCommunication.isPermissionGranted()
      console.log('isPermissionGranted return value', permission)

      if (!permission) {
        console.log('Permission denied. Asking for permission again.')

        mobileBridgeCommunication
          .cameraAccess()
          ?.then(state => setAccessStatus(state))
          .catch(err => {
            console.log('Error asking for camera permission', err)
            setAccessStatus('prompt')
          })

        return
      }

      setAccessStatus('granted')
    }
  }, [])

  async function grantAccess(usersCameraDevices: {
    frontCameraId: string
    backCameraId: string
  }) {
    if ('mediaDevices' in window.navigator) {
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
    } else {
      console.log(
        '`mediaDevices` API is not available. Trying to call `cameraAccess()`'
      )

      const mobileBridgeCommunication = MobileBridgeCommunication.initialize()

      const permission = mobileBridgeCommunication.isPermissionGranted()
      console.log('isPermissionGranted return value', permission)

      if (!permission) {
        console.log('Permission denied. Asking for permission again.')

        mobileBridgeCommunication
          .cameraAccess()
          ?.then(state => setAccessStatus(state))
          .catch(err => {
            console.log('Error asking for camera permission', err)
            setAccessStatus('prompt')
          })
      }
    }
  }

  return { accessStatus, grantAccess }
}
