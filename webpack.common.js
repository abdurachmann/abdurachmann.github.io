const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPWAManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            favicon: 'src/images/icon.png',
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HTMLWebpackPlugin({
            template: './src/nav.html',
            filename: 'nav.html',
        }),
        new workboxPlugin.InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
        }),
        new WebpackPWAManifest({
            name: 'Kabar Manuk App',
            short_name: 'Kabar Manuk',
            description: 'All about Liverpool',
            gcm_sender_id: '941296991708',
            start_url: '/index.html',
            display: 'standalone',
            background_color: '#b71c1c',
            theme_color: '#fdd835',
            icons: [
                {
                    src: path.resolve('src/images/icon.png'),
                    destination: path.join('src', 'images', 'icons'),
                    sizes: [96, 128, 192, 256, 284, 512]
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/pages/',
                    to: 'src/pages/'
                },
                {
                    from: 'src/style/',
                    to: 'src/style/'
                },
                {
                    from: 'src/images',
                    to: 'src/images/'
                }
            ]
        })
    ]
};