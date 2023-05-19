/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

import type { Configuration } from './configuration'
import type { RequestArgs } from './base'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { RequiredError } from './base'
export const DUMMY_BASE_URL = 'https://example.com'
/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = function (
  functionName: string,
  paramName: string,
  paramValue: unknown
) {
  if (paramValue === null || paramValue === undefined) {
    throw new RequiredError(
      paramName,
      `Required parameter ${paramName} was null or undefined when calling ${functionName}.`
    )
  }
}
/**
 *
 * @export
 */
export const setApiKeyToObject = async function (
  object: any,
  keyParamName: string,
  configuration?: Configuration
) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue =
      typeof configuration.apiKey === 'function'
        ? await configuration.apiKey(keyParamName)
        : await configuration.apiKey
    object[keyParamName] = localVarApiKeyValue
  }
}
function setFlattenedQueryParams(
  urlSearchParams: URLSearchParams,
  parameter: any,
  key: string = ''
): void {
  if (parameter == null) return
  if (typeof parameter === 'object') {
    if (Array.isArray(parameter)) {
      ;(parameter as any[]).forEach((item) =>
        setFlattenedQueryParams(urlSearchParams, item, key)
      )
    } else {
      Object.keys(parameter).forEach((currentKey) =>
        setFlattenedQueryParams(
          urlSearchParams,
          parameter[currentKey],
          `${key}${key !== '' ? '.' : ''}${currentKey}`
        )
      )
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter)
    } else {
      urlSearchParams.set(key, parameter)
    }
  }
}
/**
 *
 * @export
 */
export const setSearchParams = function (
  url: URL,
  ...objects: any[]
) {
  const searchParams = new URLSearchParams(url.search)
  setFlattenedQueryParams(searchParams, objects)
  url.search = searchParams.toString()
}
/**
 *
 * @export
 */
export const serializeDataIfNeeded = function (
  value: any,
  requestOptions: any,
  configuration?: Configuration
) {
  const nonString = typeof value !== 'string'
  const needsSerialization =
    nonString && configuration && configuration.isJsonMime
      ? configuration.isJsonMime(
          requestOptions.headers['Content-Type']
        )
      : nonString
  return needsSerialization
    ? JSON.stringify(value !== undefined ? value : {})
    : value || ''
}
/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
  return url.pathname + url.search + url.hash
}
/**
 *
 * @export
 */
export const createRequestFunction = function (
  axiosArgs: RequestArgs,
  globalAxios: AxiosInstance,
  BASE_PATH: string,
  configuration?: Configuration
) {
  return <T = unknown, R = AxiosResponse<T>>(
    axios: AxiosInstance = globalAxios,
    basePath: string = BASE_PATH
  ) => {
    const axiosRequestArgs = {
      ...axiosArgs.options,
      url: (configuration?.basePath || basePath) + axiosArgs.url
    }
    return axios.request<T, R>(axiosRequestArgs)
  }
}
