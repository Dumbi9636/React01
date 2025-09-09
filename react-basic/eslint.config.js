import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// eslint 는 javascript 작성 규칙
// 작성 규칙에 어긋나면 경고 표시 
// 조원들 별로 코딩 스타일이 다를 경우, 이 페이지에서 규칙을 정해놓을 수 있음 
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'], // 어떤 파일에 대해서 검사할 것인지
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020, // javascript 버전 
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }], // 사용되지 않는 변수에 대해서 에러 표시 
    },
  },
])
