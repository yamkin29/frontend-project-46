export default function json(ast) {
  return `${JSON.stringify(ast, null, 2)}`
}
