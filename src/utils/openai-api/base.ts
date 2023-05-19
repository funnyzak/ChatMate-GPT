/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

import type { Configuration } from './configuration'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import globalAxios from 'axios'
export const BASE_PATH = 'https://api.openai.com/v1'.replace(
  /\/+$/,
  ''
)
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|'
}
/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
  url: string
  options: AxiosRequestConfig
}
/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration | undefined
  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected axios: AxiosInstance = globalAxios
  ) {
    if (configuration) {
      this.configuration = configuration
      this.basePath = configuration.basePath || this.basePath
    }
  }
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  constructor(public field: string, msg?: string) {
    super(msg)
    this.name = 'RequiredError'
  }
}
