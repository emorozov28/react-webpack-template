import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export type BuildPaths = Record<'entry' | 'build' | 'html' | 'src', string>;
type Mode = 'development' | 'production';
interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            filename: 'js/[name].[contenthash:8].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/', // щоб URL ассетів були акуратні
            clean: true,
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new webpack.DefinePlugin({
                __isDev__: isDev,
            }),
            isDev && new ReactRefreshWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                },
            }),
            // new BundleAnalyzerPlugin()
            // new webpack.ProgressPlugin(),
        ].filter(Boolean) as webpack.WebpackPluginInstance[],
        module: {
            rules: [
                // ⬇️ SWC замість ts-loader
                {
                    test: /\.[jt]sx?$/i,
                    include: paths.src,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'swc-loader',
                        options: {
                            jsc: {
                                target: 'es2020',
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                    decorators: false,
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                        development: isDev,
                                        refresh: isDev, // для React Fast Refresh
                                    },
                                },
                            },
                            sourceMaps: isDev,
                        },
                    }],
                },

                // SCSS modules
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: isDev ? '[local]--[contenthash:5]' : '[contenthash:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                // SCSS global
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module\.s[ac]ss$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },

                // Images
                {
                    test: /\.(png|jpe?g|gif|webp|avif)$/i,
                    type: 'asset/resource',
                    generator: { filename: isDev ? 'images/[name]--[contenthash:5][ext]' : 'images/[contenthash:8][ext]' },
                },

                // SVG: компонент за замовчуванням, URL за ?url або з CSS
                {
                    test: /\.svg$/i,
                    oneOf: [
                        { issuer: /\.[jt]sx?$/, resourceQuery: { not: [/url/] }, use: ['@svgr/webpack'] },
                        { resourceQuery: /url/, type: 'asset/resource', generator: { filename: isDev ? 'images/svg/[name]--[contenthash:5][ext]' : 'images/svg/[contenthash:8][ext]' } },
                        { issuer: { not: [/\.[jt]sx?$/] }, type: 'asset/resource', generator: { filename: isDev ? 'images/svg/[name]--[contenthash:5][ext]' : 'images/svg/[contenthash:8][ext]' } },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [paths.src, 'node_modules'],
            mainFiles: ['index'],
            alias: {
                src: paths.src,
            },
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev && {
            port: env.port ?? 8080,
            historyApiFallback: true,
            hot: true,
            client: {
                logging: 'error',
                overlay: { errors: true, warnings: false },
                progress: false,
            },
        } as DevServerConfiguration,
        // (опц.) увімкнути code-splitting/runtime-гілку більш явно
        // optimization: {
        //   runtimeChunk: 'single',
        //   splitChunks: { chunks: 'all' },
        // },
    };

    return config;
};
