import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types';

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
    }

    return plugins;
}
