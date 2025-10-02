import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fp = name => path.resolve(__dirname, '..', '__fixtures__', name)
const read = name => readFileSync(fp(name), 'utf-8')

test('plain: json + json', () => {
    const expected = read('expected_plain.txt')
    expect(genDiff(fp('nested_file1.json'), fp('nested_file2.json'), 'plain')).toBe(expected)
})

test('plain: yml + yml', () => {
    const expected = read('expected_plain.txt')
    expect(genDiff(fp('nested_file1.yml'), fp('nested_file2.yml'), 'plain')).toBe(expected)
})

test('plain: mixed json + yml', () => {
    const expected = read('expected_plain.txt')
    expect(genDiff(fp('nested_file1.json'), fp('nested_file2.yml'), 'plain')).toBe(expected)
})
