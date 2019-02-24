module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4'
      ]
    }),
    require('cssnano')({
      preset: 'default',
      zindex: false,
      reduceTdent: false
    })
  ]
};
