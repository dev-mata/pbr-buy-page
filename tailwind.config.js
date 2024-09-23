/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pbr-yellow' : '#FBE3B5',
        'pbr-yellow-light' : '#FFE0A5',
        'pbr-yellow-dark' : '#F6BC5B',
        'pbr-blue' : '#006DFF',
        'pb-gray' : '#D9D9D9'
      },
      fontFamily: {
        londrina: ['var(--font-londrina)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
