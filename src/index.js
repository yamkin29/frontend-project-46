import { readFile } from './fs.js'
import parse from './parsers.js'
import buildAst from './buildAst.js'
import stylish from './formatters/stylish.js'

const formatters = { stylish }

export default function genDiff(filepath1, filepath2, format = 'stylish') {
    const data1 = parse(readFile(filepath1), filepath1)
    const data2 = parse(readFile(filepath2), filepath2)
    const ast = buildAst(data1, data2)

    const formatter = formatters[format]
    if (!formatter) throw new Error(`Unknown format: ${format}`)
    return formatter(ast)
}
