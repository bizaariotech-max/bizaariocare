/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 This tells Tailwind to scan your React files
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "gradient-soft":
          "linear-gradient(135deg, rgba(82, 95, 226, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%)",
      },
    },
  },
  plugins: [],
};
