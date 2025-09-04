import path from 'path';
import type webpack from 'webpack';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';
import {BuildPaths, Mode} from './config/build/types';

export interface BuildEnv {
    mode: Mode;
    port: number;
}

export default (env: BuildEnv): webpack.Configuration => {
    const mode: Mode = env.mode ?? 'development';
    const isDev = mode === 'development';
    const port = Number(env.port ?? 8080);

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        dist: path.resolve(__dirname, 'dist'),
        public: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    return buildWebpackConfig({ mode, isDev, port, paths });
};
