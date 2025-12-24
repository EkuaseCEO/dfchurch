import flowbiteReact from "flowbite-react/plugin/tailwindcss";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class", // 🔥 REQUIRED FOR REDUX DARK MODE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
    // ← REQUIRED!
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
}