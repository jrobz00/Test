module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust to your file structure
  ],
  theme: {
    extend: {
      animation: {
        "siri-pulse": "siri-pulse 6s infinite ease-in-out",
      },
      keyframes: {
        "siri-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.3",
          },
          "50%": {
            transform: "scale(1.3)",
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
};
