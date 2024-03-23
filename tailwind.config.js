/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        worksans: ["work sans", "Sans-serif"],
      },
      backgroundImage: {
        Loginbg: "url('./src/assets/Images/Login_bg.svg')",
        Landbg: "url('./src/assets/Images/Landing_bg.svg')",

        "my-gradient":
          "linear-gradient(315deg, hsla(212, 78%, 79%, 1) 46%, hsla(294, 48%, 55%, 1) 73%, hsla(11, 100%, 82%, 1) 86%, hsla(0, 0%, 100%, 1) 100%);",
      },
    },
  },
  plugins: [],
};
