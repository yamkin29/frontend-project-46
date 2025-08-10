import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**'],

    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: { console: 'readonly' },
    },
  },
]
