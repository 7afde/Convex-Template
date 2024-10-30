/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        DMSansRegular: ["DMSans_400Regular", "sans-serif"],
        DMSansMedium: ["DMSans_500Medium", "sans-serif"],
        DMSansBold: ["DMSans_700Bold", "sans-serif"],
      },
      colors: {
        background: "#FDF8FF",
        border: "#acacac",
        itemBackground: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
