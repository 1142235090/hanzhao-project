const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
        { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
        { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
        { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('../')
      })
    ]
  }
}