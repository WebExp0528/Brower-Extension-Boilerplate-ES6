const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

const common = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [

        // clean dist folder
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    devtool: 'cheap-module-source-map'
}
if (process.env.NODE_ANALYZE) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(common, prodConfig)