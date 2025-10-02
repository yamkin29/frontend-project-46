export const isPlainObject = v =>
    typeof v === 'object' && v !== null && !Array.isArray(v)
