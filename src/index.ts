import { compile } from 'ejs'
import type { LoaderContext } from 'webpack'
import { getFileData } from './utils'
import type {
  LoaderOptions
} from './types'

export default function EjsWpLoader (this: LoaderContext<LoaderOptions>, source: string) {
  const defaultOptions = {
    alias: {}
  }

  const loaderOpts = Object.assign({}, defaultOptions, this.getOptions())

  const fn = compile(source, {
    client: true
  })

  const html = fn(undefined, undefined, (filePath, opts) => {
    return getFileData(filePath, this.resourcePath, opts, loaderOpts).template || ''
  })

  return html
}
