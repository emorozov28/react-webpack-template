import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BuildOptions} from './types';

export function buildLoaders({isDev, paths}: BuildOptions) {
    const tsAndJs = {
        test: /\.[jt]sx?$/i,
        include: paths.src,
        exclude: /node_modules/,
        use: [{
            loader: 'swc-loader',
            options: {
                jsc: {
                    target: 'es2020',
                    parser: { syntax: 'typescript', tsx: true },
                    transform: { react: { runtime: 'automatic', development: isDev, refresh: isDev } },
                },
                sourceMaps: isDev,
            },
        }],
    };

    const scssModules = {
        test: /\.module\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: { namedExport: false, localIdentName: isDev ? '[local]--[contenthash:5]' : '[contenthash:8]' },
                },
            },
            'sass-loader',
        ],
    };

    const scssGlobal = {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    };

    const images = {
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        type: 'asset/resource',
        generator: { filename: isDev ? 'images/[name]--[contenthash:5][ext]' : 'images/[contenthash:8][ext]' },
    };

    const svg = {
        test: /\.svg$/i,
        oneOf: [
            { issuer: /\.[jt]sx?$/, resourceQuery: { not: [/url/] }, use: ['@svgr/webpack'] },
            { resourceQuery: /url/, type: 'asset/resource', generator: { filename: isDev ? 'images/svg/[name]--[contenthash:5][ext]' : 'images/svg/[contenthash:8][ext]' } },
            { issuer: { not: [/\.[jt]sx?$/] }, type: 'asset/resource', generator: { filename: isDev ? 'images/svg/[name]--[contenthash:5][ext]' : 'images/svg/[contenthash:8][ext]' } },
        ],
    };

    return [tsAndJs, scssModules, scssGlobal, images, svg];
}
