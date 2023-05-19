/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-18.
 */

import { logInfo } from '@src/helper'
import { ICloudContainerSetting } from '@src/types'
import { getTimestampSecond } from '@src/utils/utils'
import { useEffect, useState } from 'react'
import * as CloudStore from 'react-native-cloud-store'

export { CloudStore as ICloudStore }

/**
 * ICloud data type
 */
export interface ICloudData<T> {
  data?: T
  lastestUpdate?: number
  extra?: {
    [key: string]: any
  }
}

export const readICloudData = async <T>(
  cloud_path: string
): Promise<ICloudData<T> | undefined> => {
  try {
    if (!(await CloudStore.exist(cloud_path))) return undefined

    const _rlt = await CloudStore.readFile(cloud_path)
    return _rlt ? (JSON.parse(_rlt) as ICloudData<T>) : undefined
  } catch (error) {
    logInfo('readICloudData error:', error)
    return Promise.reject(error)
  }
}

export const useICloud = (iCloudSetting: ICloudContainerSetting) => {
  const [isAvailable, setIsAvailable] = useState(false)
  const [cloudContainerPath, setCloudContainerPath] =
    useState<string>()
  const [cloudURL, setCloudURL] = useState<string>()

  useEffect(() => {
    CloudStore.isICloudAvailable().then((_isAvailable) => {
      setIsAvailable(_isAvailable)

      if (_isAvailable) {
        CloudStore.getDefaultICloudContainerPath().then(
          (_cloudContainerPath) => {
            setCloudContainerPath(_cloudContainerPath)
          }
        )

        CloudStore.getICloudURL(iCloudSetting.name).then(
          (_cloudURL) => {
            setCloudURL(_cloudURL)
          }
        )
      }
    })

    const r1 = CloudStore.onICloudIdentityDidChange((u) => {
      logInfo(`onICloudIdentityDidChange:`, u)
    })

    const r2 = CloudStore.onICloudDocumentsStartGathering((u) => {
      logInfo(`onICloudDocumentsStartGathering:`, u)
    })

    const r3 = CloudStore.onICloudDocumentsGathering((u) => {
      logInfo(`onICloudDocumentsGathering:`, u)
    })

    const r4 = CloudStore.onICloudDocumentsFinishGathering((u) => {
      logInfo(`onICloudDocumentsFinishGathering:`, u)
    })

    const r5 = CloudStore.onICloudDocumentsUpdateGathering((u) => {
      logInfo(`onICloudDocumentsUpdateGathering:`, u)
    })

    return () => {
      r1.remove()
      r2.remove()
      r3.remove()
      r4.remove()
      r5.remove()
    }
  }, [iCloudSetting])

  const readFileData = async <T>(
    filePath: string
  ): Promise<ICloudData<T> | undefined> => {
    if (!isAvailable || !cloudContainerPath) {
      throw new Error(
        'iCloud synchronization failed. Please check if you are logged in to your Apple ID or if there is a network issue.'
      )
    }

    logInfo('readFileData filePath:', cloudContainerPath, filePath)

    const _path = CloudStore.PathUtils.join(
      cloudContainerPath!,
      filePath
    )
    logInfo('readFileData _path:', _path)

    return readICloudData<T>(_path)
  }

  const updateFileData = async <T>(
    filePath: string,
    cloudData: ICloudData<T>
  ): Promise<ICloudData<T>> => {
    if (!isAvailable || !cloudContainerPath) {
      throw new Error(
        'iCloud synchronization failed. Please check if you are logged in to your Apple ID or if there is a network issue.'
      )
    }

    cloudData.lastestUpdate = getTimestampSecond()
    const _path = CloudStore.PathUtils.join(
      cloudContainerPath!,
      filePath
    )

    try {
      await CloudStore.writeFile(_path, JSON.stringify(cloudData), {
        override: true
      })
      return cloudData
    } catch (error) {
      logInfo('writeFileData error:', error)
      return Promise.reject(error)
    }
  }

  const syncCloud = async <T>(
    filePath: string,
    mergeData: (cloud_data?: ICloudData<T>) => Promise<ICloudData<T>>
  ) => {
    logInfo('Syncing iCloud...')
    try {
      const _cloudDataObj = await readFileData<T>(filePath)

      logInfo('Syncing iCloud _cloudDataObj:', _cloudDataObj)
      const _mergeData = await mergeData(_cloudDataObj)
      logInfo('Syncing iCloud _mergeData:', _mergeData)
      // logInfo('syncCloud _mergeData:', _mergeData)
      return await updateFileData(filePath, _mergeData)
    } catch (error) {
      logInfo('Syncing iCloud Error:', error)
      return Promise.reject(error)
    }
  }

  const restoreFromCloud = async <T>(
    filePath: string,
    restore: (cloud_data?: ICloudData<T>) => Promise<void>
  ) => {
    try {
      const _cloudDataObj = await readFileData<T>(filePath)
      await restore(_cloudDataObj)
    } catch (error) {
      logInfo('restoreFromCloud error:', error)
      return Promise.reject(error)
    }
  }

  const overwriteCloud = async <T>(
    filePath: string,
    data: ICloudData<T>
  ) => {
    try {
      await updateFileData(filePath, data)
    } catch (error) {
      logInfo('overwireCloud error:', error)
      return Promise.reject(error)
    }
  }

  return {
    iCloudAvailable: isAvailable,
    cloudContainerPath,
    readFileData,
    overwriteICloud: overwriteCloud,
    restoreFromCloud,
    syncCloud,
    CloudStore
  }
}
