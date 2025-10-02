import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.resolve(__dirname, '..', '__fixtures__', name)
const readFixture = name => readFileSync(getFixturePath(name), 'utf-8')

test('gendiff flat JSON -> expected stylish output', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFixture('expected_flat.txt')

  const result = genDiff(file1, file2)

  expect(result).toBe(expected)
})
