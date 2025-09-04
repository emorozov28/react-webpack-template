import type {BuildDevServer, BuildOptions} from './types';

export function buildDevServer({ isDev, port }: BuildOptions): BuildDevServer | undefined {
    if (!isDev) return undefined;
    return {
        port,
        historyApiFallback: true,
        hot: true,
        client: {
            logging: 'error',
            overlay: {errors: true, warnings: false},
            progress: false,
        },
    };
}
