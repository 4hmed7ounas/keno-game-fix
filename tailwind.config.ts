import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxl: { min: "1920px" }, // this is to support your 23". Make sure your 15.6" screen is less than the min px value passed here
    },
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
        xl: "4px 4px 8px rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        "custom-gold": "  0 2px 4px 0px rgb(201 141 31)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        spinFast: "spin 0.3s linear infinite",
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pingSmall: "pingSmall 1s cubic-bezier(0, 0, 0.1, 0.5) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pingSmall: {
          "75%, 100%": {
            transform: "scale(1)",
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-sm": {
          "text-shadow": "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          "text-shadow": "3px 3px 6px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-xl": {
          "text-shadow": "6px 6px 12px rgba(0, 0, 0, 0.5)",
        },
      });
    },
  ],
};
export default config;
