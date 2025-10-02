import { isPlainObject } from '../utils.js'

const INDENT_SIZE = 4
const SIGN_SHIFT = 2

const indent = depth => ' '.repeat(depth * INDENT_SIZE - SIGN_SHIFT)
const plainIndent = depth => ' '.repeat(depth * INDENT_SIZE)

const stringify = (value, depth) => {
  if (!isPlainObject(value)) return String(value)

  const entries = Object.entries(value)
    .map(([k, v]) => `${plainIndent(depth + 1)}${k}: ${stringify(v, depth + 1)}`)

  return `{\n${entries.join('\n')}\n${plainIndent(depth)}}`
}

const formatNode = (node, depth) => {
  const i = indent(depth)

  switch (node.type) {
    case 'nested':
      return `${plainIndent(depth)}${node.key}: {\n${node.children.map(ch => formatNode(ch, depth + 1)).join('\n')}\n${plainIndent(depth)}}`

    case 'unchanged':
      return `${plainIndent(depth)}${node.key}: ${stringify(node.value, depth)}`

    case 'removed':
      return `${i}- ${node.key}: ${stringify(node.value, depth)}`

    case 'added':
      return `${i}+ ${node.key}: ${stringify(node.value, depth)}`

    case 'updated':
      return [
        `${i}- ${node.key}: ${stringify(node.oldValue, depth)}`,
        `${i}+ ${node.key}: ${stringify(node.newValue, depth)}`,
      ].join('\n')

    default:
      throw new Error(`Unknown node type: ${node.type}`)
  }
}

export default function formatStylish(ast) {
  const body = ast.map(n => formatNode(n, 1)).join('\n')
  return `{\n${body}\n}`
}
