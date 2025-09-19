import { readFile } from './fs.js'
import parse from './parsers.js'

const formatValue = value => String(value)

const buildDiff = (obj1, obj2) => {
    const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort((a, b) => a.localeCompare(b))

    const lines = keys.flatMap((key) => {
        const in1 = Object.prototype.hasOwnProperty.call(obj1, key)
        const in2 = Object.prototype.hasOwnProperty.call(obj2, key)

        if (in1 && in2) {
            if (obj1[key] === obj2[key]) {
                return [`    ${key}: ${formatValue(obj1[key])}`]
            }
            return [
                `  - ${key}: ${formatValue(obj1[key])}`,
                `  + ${key}: ${formatValue(obj2[key])}`,
            ]
        }

        if (in1) return [`  - ${key}: ${formatValue(obj1[key])}`]
        return [`  + ${key}: ${formatValue(obj2[key])}`]
    })

    return ['{', ...lines, '}'].join('\n')
}

export default function genDiff(filepath1, filepath2 /* , format */) {
    const data1 = parse(readFile(filepath1), filepath1)
    const data2 = parse(readFile(filepath2), filepath2)
    return buildDiff(data1, data2)
}
