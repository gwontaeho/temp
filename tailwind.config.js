/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      w: "#ffffff",
      bk: "#000000",
      bg: "#0b1727",
      bl: "#2c7be5",
      txt: "#b6c1d2",
      card: "#121e2d",
      border: "#344050",
      header: "#232e3c",
      invalid: "#e63757",
      disabled: "#4d5969",
    },
    fontSize: {
      sm: "0.7rem",
      base: "0.75rem",
      lg: "0.9rem",
      xl: "1rem",
      "2xl": "1.2rem",
    },
    extend: {},
  },
  plugins: [],
};
