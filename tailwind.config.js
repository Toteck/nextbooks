/** @type {import('tailwindcss').Config} */
module.exports = {
  // 💡 Habilita a variação 'dark:' do Tailwind, que reage à presença da classe 'dark' no elemento <html>.
  darkMode: "class",

  content: [
    // Define quais arquivos o Tailwind deve escanear para classes
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      
    },
  },
  plugins: [],
};
