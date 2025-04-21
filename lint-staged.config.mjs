export default {
  "**/!(package-lock)*.{js,mjs,cjs,ts,json,jsonc,json5,md,css}": [
    "eslint",
    "prettier --write --ignore-unknown",
  ],
  "**/!(*.{js,mjs,cjs,ts,json,jsonc,json5,md,css})":
    "prettier --write --ignore-unknown",
};
