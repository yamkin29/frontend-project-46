import { extname } from 'node:path'

const parseJson = content => JSON.parse(content)

export default function parse(content, filepath) {
    const ext = extname(filepath).toLowerCase()
    switch (ext) {
        case '.json':
            return parseJson(content)
        default:
            throw new Error(`Unsupported file format: ${ext}`)
    }
}
