const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const devConfig = {
    mode: 'development',
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, './../extension/dev/dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({

        }),
        new ProgressBarPlugin({
            format: 'Build [:bar] :percent (:elapsed seconds)',
            clear: false,
        }),
    ]
}

module.exports = merge(common, devConfig)