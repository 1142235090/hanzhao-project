const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'cesium/Workers' },
          { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'cesium/ThirdParty' },
          { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'cesium/Assets' },
          { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'cesium/Widgets' },
        ],
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('')
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  },
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    //proxy: proxyObj, // string | Object
    before: app => { }
  }
}