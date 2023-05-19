import { ICloudConfig } from '@src/config'
import { logInfo } from '@src/helper'
import { ICloudContainerSetting } from '@src/types'
import * as CloudStore from 'react-native-cloud-store'

export class ICloudHelper {
  private config?: ICloudContainerSetting
  iCloudAvailable: boolean = false
  iCloudContainerPath?: string
  iCloudURL?: string

  constructor(_config?: ICloudContainerSetting) {
    this.config = _config
  }

  async init(_config?: ICloudContainerSetting) {
    this.iCloudAvailable = await CloudStore.isICloudAvailable()
    try {
      if (this.iCloudAvailable) {
        this.iCloudContainerPath =
          await CloudStore.getDefaultICloudContainerPath()
        this.iCloudURL = await CloudStore.getICloudURL(_config?.name)
      }

      logInfo(
        'iCloudHelper init:',
        'iCloudAvailable:',
        this.iCloudAvailable,
        'iCloudContainerPath:',
        this.iCloudContainerPath,
        'iCloudURL:',
        this.iCloudURL
      )
    } catch (e) {
      logInfo('CloudStore.getDefaultICloudContainerPath error:', e)
      return Promise.reject(e)
    }
  }

  async refresh(_config?: ICloudContainerSetting) {
    this.config = _config
    return this.init(this.config)
  }

  async readFile<T>(path: string): Promise<T | undefined> {
    if (!this.iCloudAvailable) return undefined

    const _path = CloudStore.PathUtils.join(
      this.iCloudContainerPath!,
      path
    )

    try {
      if (!(await CloudStore.exist(_path))) return undefined

      const _rlt = await CloudStore.readFile(_path)
      return _rlt ? (JSON.parse(_rlt) as T) : undefined
    } catch (error) {
      logInfo('readICloudData error:', error)
      return Promise.reject(error)
    }
  }

  async writeFile<T>(path: string, override: boolean, data: T) {
    if (!this.iCloudAvailable) return undefined
    const _path = CloudStore.PathUtils.join(
      this.iCloudContainerPath!,
      path
    )
    try {
      await CloudStore.writeFile(_path, JSON.stringify(data), {
        override
      })
      return Promise.resolve(data)
    } catch (error) {
      logInfo('writeFileData error:', error)
      return Promise.reject(error)
    }
  }

  async syncICloudData<T>(
    path: string,
    mergeData: (cloud_data: T) => Promise<T>
  ) {
    try {
      if (!this.iCloudAvailable)
        return Promise.reject(new Error('iCloud not available'))

      const cloud_data = await this.readFile<T>(path)
      const merge_data = await mergeData(cloud_data!)
      return await this.writeFile<T>(path, true, merge_data)
    } catch (error) {
      logInfo('syncICloudData error:', error)
      return Promise.reject(error)
    }
  }

  async restoreICloudData<T>(
    path: string,
    restore: (cloud_data?: T) => Promise<void>
  ) {
    try {
      await restore(await this.readFile<T>(path))
    } catch (error) {
      logInfo('restoreICloudData error:', error)
      return Promise.reject(error)
    }
  }

  async overrideICloudData<T>(path: string, data: T) {
    try {
      await this.writeFile<T>(path, true, data)
    } catch (error) {
      logInfo('overrideICloudData error:', error)
      return Promise.reject(error)
    }
  }
}

export const iCloudHelperAPI = new ICloudHelper(
  ICloudConfig.containers[0]
)
