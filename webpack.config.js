const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: "web",
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp)$/i,
                use: ['url-loader']
            },
            {
                test: /\.svg$/i,
                use: ['svg-inline-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            inject: "body"
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@/public': path.resolve(__dirname, 'public'),
            '@/app': path.resolve(__dirname, 'src'),
            '@/types': path.resolve(__dirname, 'src/@types')
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: "./dist"
    }
};