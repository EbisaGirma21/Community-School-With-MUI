/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "bounce-custom": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)", // Adjust the distance here
          },
        },
      },
      animation: {
        bounce: "bounce-custom 5s linear infinite",
      },
    },
  },
  plugins: [],
};
