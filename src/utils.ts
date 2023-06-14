import { render } from 'ejs'
import fs from 'fs'
import path from 'path'
import type { IncluderResult, Data } from 'ejs'
import type { LoaderOptions } from './types'

function getAliasRealPath (filePath: string, alias: object, resourcePath: string): string {
  const aliasPath = (Object.entries(alias) as [string, string][]).find(([key]) => {
    return filePath.substr(0, key.length + 1) === key + '/'
  })

  if (aliasPath) {
    return aliasPath ? filePath.replace(aliasPath[0], aliasPath[1]) : filePath
  }

  return path.resolve(resourcePath, '../', filePath)
}

export function getFileData (filePath: string, resourcePath: string, opts: Data | undefined, loaderOpts: LoaderOptions): IncluderResult {
  if (filePath && filePath.substr(-4) !== '.ejs') {
    filePath += '.ejs'
  }
  const currentPath = getAliasRealPath(filePath, loaderOpts.alias, resourcePath)
  const ejsContent = fs.readFileSync(currentPath, { encoding: 'utf-8' })

  return {
    // filename: currentPath,
    template: getHtmlContent(ejsContent, currentPath, opts, loaderOpts)
  }
}

export function getHtmlContent (content: string, resourcePath: string, opts: Data | undefined, loaderOpts: LoaderOptions): string {
  const reg = /<%-.*?%>/
  if (reg.test(content)) {
    const htmlContent = render(
      content,
      opts,
      {
        includer: (originalPath) => {
          return getFileData(originalPath, resourcePath, undefined, loaderOpts)
        }
      }
    )

    return htmlContent
  }
  return content
}
