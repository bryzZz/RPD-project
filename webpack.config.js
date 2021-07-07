const path = require("path"),
    HTMLPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

// variables to know which mode we are in
const isDev = process.env.NODE_ENV === 'development', isProd = !isDev;

// function for correct names
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const plugins = () => {
    return [
        new CleanWebpackPlugin(),
        new HTMLPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({ filename: "css/" + filename('css')}),
    ];
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
  
    if (isProd) {
        config.minimize = true;
        config.minimizer = [new TerserPlugin()]
    }
  
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ["./js/index.js"],
    output: {
        filename: 'js/' + filename('js'),
        path: path.resolve(__dirname, "dist"),
    },
    optimization: optimization(),
    plugins: plugins(),
    devServer: {
        historyApiFallback: isDev,
        contentBase: path.resolve(__dirname, "dist/index.html"),
        open: isDev,
        compress: isDev,
        hot: isDev,
        port: 3000,
    },
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + "/";
                        },
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};