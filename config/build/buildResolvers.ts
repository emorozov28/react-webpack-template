import {ResolveOptions} from 'webpack';
import {BuildOptions} from './types';

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {src: paths.src},
    };
}
