import { isPlainObject } from './utils.js'

const sortKeys = keys => [...keys].sort((a, b) => a.localeCompare(b))

export default function buildAst(obj1, obj2) {
    const keys = sortKeys(new Set([...Object.keys(obj1), ...Object.keys(obj2)]))

    return keys.map((key) => {
        const in1 = Object.hasOwn(obj1, key)
        const in2 = Object.hasOwn(obj2, key)

        if (in1 && in2 && isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
            return { type: 'nested', key, children: buildAst(obj1[key], obj2[key]) }
        }

        if (in1 && in2 && obj1[key] === obj2[key]) {
            return { type: 'unchanged', key, value: obj1[key] }
        }

        if (in1 && in2 && obj1[key] !== obj2[key]) {
            return { type: 'updated', key, oldValue: obj1[key], newValue: obj2[key] }
        }

        if (in1 && !in2) {
            return { type: 'removed', key, value: obj1[key] }
        }

        return { type: 'added', key, value: obj2[key] }
    })
}
