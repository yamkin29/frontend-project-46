import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const toAbsolutePath = filepath => resolve(filepath)

export const readFile = filepath =>
  readFileSync(toAbsolutePath(filepath), 'utf-8')
