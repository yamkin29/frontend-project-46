import stylish from './stylish.js'
import plain from './plain.js'

const formatters = { stylish, plain }

export default function format(ast, name = 'stylish') {
    const formatter = formatters[name]
    if (!formatter) throw new Error(`Unknown format: ${name}`)
    return formatter(ast)
}
