/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

export interface ConfigurationParameters {
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>)
  organization?: string
  basePath?: string
  baseOptions?: any
}
export class Configuration {
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>)
  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string
  /**
   * base options for axios calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions?: any
  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey
    this.basePath = param.basePath
    this.baseOptions = param.baseOptions
    if (!this.baseOptions) {
      this.baseOptions = {}
    }
    this.baseOptions.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      ...this.baseOptions.headers
    }
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp(
      '^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$',
      'i'
    )
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === 'application/json-patch+json')
    )
  }
}
