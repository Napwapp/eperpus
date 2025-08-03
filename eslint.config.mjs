import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore specific directories
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/out/**",
      "**/lib/generated/**"
    ]
  },  
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // File dependency rules
  {
    files: ["node_modules/**", "lib/generated/**"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-undef": "off",
      "no-unused-vars": "off"
    }
  }
];

export default eslintConfig;
