const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

if (isDevelopment) {
    output_Path = "./../extension/dev";
} else {
    output_Path = "./../extension/prod";
}

module.exports = {
    entry: {
        options: path.resolve(__dirname, "./../src/app/options.js"),
        popup: path.resolve(__dirname, "./../src/app/popup.js"),
        main: path.resolve(__dirname, "./../src/app/main.js"),
        background: path.resolve(__dirname, "./../src/app/background.js")
    },

    output: {
        path: path.resolve(__dirname, output_Path + "/dist"),
        filename: "[name].js"
    },

    resolve: {
        extensions: [".js", ".json", ".scss", ".css"],
        alias: {
            utils: path.resolve(__dirname, "./../src/app/utils"),
            icons: path.resolve(__dirname, "./../src/icons"),
            styles: path.resolve(__dirname, "./../src/styles"),
            features: path.resolve(__dirname, "./../src/app/features"),
            core: path.resolve(__dirname, "./../src/app/core")
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loaders: ["html-loader"]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === "development"
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                NODE_ANALYZE: JSON.stringify(process.env.NODE_ANALYZE)
            }
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./../src/views/options.html"),
            filename: "options.html",
            chunks: ["options"],
            inject: true,
            minify: true
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./../src/views/popup.html"),
            filename: "popup.html",
            chunks: ["popup"],
            inject: true,
            minify: true
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        new CopyWebpackPlugin([
            {
                from: "src/_locales",
                to: "./../_locales"
            },
            {
                from: "src/icons",
                to: "./../icons"
            },
            {
                from: "src/lib",
                to: "./../lib"
            },
            {
                from: "src/manifest.json",
                to: "./../manifest.json"
            }
        ])
    ]
};
