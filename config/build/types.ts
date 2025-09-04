import {Configuration as DevServerConfiguration} from 'webpack-dev-server';

export type Mode = 'development' | 'production';

export type BuildPaths = Record<'entry' | 'dist' | 'html' | 'src' | 'public', string>;

export interface BuildOptions {
    mode: Mode;
    isDev: boolean;
    port: number;
    paths: BuildPaths;
}

export type BuildDevServer = DevServerConfiguration;