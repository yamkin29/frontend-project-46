import { readFile } from './fs.js'
import parse from './parsers.js'
import buildAst from './buildAst.js'
import format from './formatters/index.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
    const data1 = parse(readFile(filepath1), filepath1)
    const data2 = parse(readFile(filepath2), filepath2)
    const ast = buildAst(data1, data2)
    return format(ast, formatName)
}
