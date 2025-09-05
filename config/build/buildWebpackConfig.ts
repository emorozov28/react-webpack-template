import type webpack from 'webpack';
import {buildPlugins} from './buildPlugins';
import {buildLoaders} from './buildLoaders';
import {buildResolvers} from './buildResolvers';
import {buildDevServer} from './buildDevServer';
import {BuildOptions} from './types';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, isDev, paths } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: 'js/[name].[contenthash:8].js',
            path: paths.dist,
            publicPath: '/',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {rules: buildLoaders(options)},
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: buildDevServer(options),
        // optimization: { runtimeChunk: 'single', splitChunks: { chunks: 'all' } },
    };
}
