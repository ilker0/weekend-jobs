module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1120px'
    },

    fontFamily: {
      poppins: ['Poppins']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false
  }
}
