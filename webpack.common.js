const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/renderer/src/entries/index.js',
    account: './src/renderer/src/entries/account.js',
    monitor: './src/renderer/src/entries/monitor.js',
    session: './src/renderer/src/entries/session.js',
  },
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|avif|json)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      { test: /face-api.esm.js/, type: 'javascript/esm' },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};
