import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // next/core-web-vitals에 이미 jsx-a11y 플러그인이 포함되어 있으므로
    // 플러그인을 재정의하지 않고 규칙만 추가합니다
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  // Override default ignores of eslint-config-next.

  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
