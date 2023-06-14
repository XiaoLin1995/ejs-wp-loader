# ejs-wp-loader

EJS loader for webpack.

## Install

```bash
npm install ejs html-loader ejs-wp-loader --save-dev
# or
yarn add ejs html-loader ejs-wp-loader -D
```

## Usage

```js
// webpack.config.js
const path = require('path')

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'ejs-wp-loader',
            options: {
              alias: { // Configure how modules are resolved. 
                '@': path.resolve(__dirname, 'src')
              }
            }
          }
        ]
      }
    ]
  }
}
```

## License

MIT
