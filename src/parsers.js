import { extname } from 'node:path'
import yaml from 'js-yaml'

const parseJson = content => JSON.parse(content)
const parseYaml = content => yaml.load(content)

export default function parse(content, filepath) {
    const ext = extname(filepath).toLowerCase()
    switch (ext) {
        case '.json':
            return parseJson(content)
        case '.yml':
        case '.yaml':
            return parseYaml(content)
        default:
            throw new Error(`Unsupported file format: ${ext}`)
    }
}
