import { readFile } from './fs.js'
import parse from './parsers.js'

export default function genDiff(filepath1, filepath2/* , format */) {
    const data1 = parse(readFile(filepath1), filepath1)
    const data2 = parse(readFile(filepath2), filepath2)

    void data1
    void data2
    return ''
}
