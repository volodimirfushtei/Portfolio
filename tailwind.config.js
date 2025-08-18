// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(45deg, #eae8e8 10%, #4fd1ff 50%, #f3d887 90%)",
      },
      colors: {
        primary: "#10212B",
        secondary: "#8FA464",
        "webflow-blue": "#0099ff",
        "webflow-purple": "#7928ca",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",

        button: "8px", // Ваш кастомний клас
      },
      boxShadow: {
        webflow: "0 20px 50px -20px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
