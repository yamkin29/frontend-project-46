import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fp = name => path.resolve(__dirname, '..', '__fixtures__', name)

const asJson = res => JSON.parse(res)

const byKey = (nodes, key) => nodes.find(n => n.key === key)
const childrenOf = node => node.children ?? []

test('json format: nested json + json', () => {
  const result = genDiff(fp('nested_file1.json'), fp('nested_file2.json'), 'json')
  const data = asJson(result)

  expect(Array.isArray(data)).toBe(true)

  const common = byKey(data, 'common')
  const group1 = byKey(data, 'group1')
  const group2 = byKey(data, 'group2')
  const group3 = byKey(data, 'group3')

  expect(common.type).toBe('nested')
  expect(group1.type).toBe('nested')
  expect(group2.type).toBe('removed')
  expect(group3.type).toBe('added')

  const setting6 = byKey(childrenOf(common), 'setting6')
  const doge = byKey(childrenOf(setting6), 'doge')
  const wow = byKey(childrenOf(doge), 'wow')
  expect(wow.type).toBe('updated')
  expect(wow.oldValue).toBe('')
  expect(wow.newValue).toBe('so much')
})

test('json format: nested yml + yml', () => {
  const result = genDiff(fp('nested_file1.yml'), fp('nested_file2.yml'), 'json')
  const data = asJson(result)

  const common = byKey(data, 'common')
  const group3 = byKey(data, 'group3')
  expect(common.type).toBe('nested')
  expect(group3.type).toBe('added')
})

test('json format: mixed json + yml', () => {
  const result = genDiff(fp('nested_file1.json'), fp('nested_file2.yml'), 'json')
  const data = asJson(result)
  expect(Array.isArray(data)).toBe(true)
})
