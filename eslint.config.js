import js from '@eslint/js'

// TypeScript correctness is enforced by `pnpm run typecheck`.
// This intentionally keeps ESLint compatible with the bundled TypeScript runtime.
export default [js.configs.recommended, { ignores: ['dist', 'node_modules', '**/*.{ts,tsx}'] }]
