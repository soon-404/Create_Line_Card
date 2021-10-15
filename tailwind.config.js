module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        box: "32rem",
      },
      height: {
        box: "26rem",
      },
      fontFamily: {
        header: ["Pacifico"],
        body: ["Patrick Hand"],
      },
      backgroundImage: {
        "mainbg": "url('/src/back.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
