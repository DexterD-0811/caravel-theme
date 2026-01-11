module.exports = {
  content: [
    "./layout/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./templates/**/*.json"
  ],
  theme: {
    extend: {
      colors: {
        caravel: {
          sand: "#F5F1EC",
          brown: "#8B6F5A",
          stone: "#E7E1DA"
        }
      },
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
      }
    }
  },
  plugins: []
};
