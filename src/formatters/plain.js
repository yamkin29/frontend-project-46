import { isPlainObject } from '../utils.js'

const formatValue = (v) => {
    if (isPlainObject(v)) return '[complex value]'
    if (typeof v === 'string') return `'${v}'`
    if (v === null) return 'null'
    return String(v)
}

const iter = (nodes, ancestry) => nodes.flatMap((node) => {
    const prop = ancestry ? `${ancestry}.${node.key}` : node.key

    switch (node.type) {
        case 'nested':
            return iter(node.children, prop)

        case 'added':
            return [`Property '${prop}' was added with value: ${formatValue(node.value)}`]

        case 'removed':
            return [`Property '${prop}' was removed`]

        case 'updated':
            return [
                `Property '${prop}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
            ]

        case 'unchanged':
            return []

        default:
            throw new Error(`Unknown node type: ${node.type}`)
    }
})

export default function plain(ast) {
    return `${iter(ast, '').join('\n')}`
}
