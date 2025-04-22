export default {
  "**/*.{js,mjs,cjs,ts,css}": ["eslint", "prettier --write --ignore-unknown"],
  "**/*.!({js,mjs,cjs,ts,css})": "prettier --write --ignore-unknown",
};
