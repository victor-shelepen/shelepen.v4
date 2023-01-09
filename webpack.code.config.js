module.exports = function configBuilder(optimised = false) {
  return {
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(webp|png)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: !optimised,
          },
        },
        {
          test: /\.ya?ml$/,
          use: 'yaml-loader',
        },
      ],
    },
  }
}
