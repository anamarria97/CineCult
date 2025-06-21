import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
