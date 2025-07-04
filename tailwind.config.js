// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", // Stellen Sie sicher, dass dieser Pfad für Ihre Komponente dabei ist
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [require("tailwindcss-motion")], // Stellen Sie sicher, dass Ihr Plugin hier ist
};