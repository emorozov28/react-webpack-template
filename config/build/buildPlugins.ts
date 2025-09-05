import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {BuildOptions} from './types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export function buildPlugins({ isDev, paths }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins: webpack.WebpackPluginInstance[] = [
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico'),
        }),
        new ForkTsCheckerWebpackPlugin({ typescript: { configFile: path.resolve(process.cwd(), 'tsconfig.json') } }),
        new webpack.DefinePlugin({ __isDev__: JSON.stringify(isDev) }),

    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    } else {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        plugins.push(
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['mozjpeg',  { progressive: true, quality: 75 }],
                            ['pngquant', { quality: [0.7, 0.85] }],
                            ['svgo', {plugins: [
                                { name: 'preset-default', params: { overrides: { removeViewBox: false } } }
                            ]}
                            ],
                        ],
                    },
                },
            })
        );

    }

    return plugins;
}
