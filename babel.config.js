module.exports = function (api) {
  const env = api.env()

  const config = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.ts',
            '.tsx',
            '.json'
          ],
          alias: {
            '@src': './src',
            '@config': './src/config',
            '@res': './src/assets'
          }
        }
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ]
  }

  // 当打包时移除 console.log
  if (env === 'production') {
    config.plugins.push('transform-remove-console')
  }

  return config
}
