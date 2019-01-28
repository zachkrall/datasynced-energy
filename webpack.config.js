const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/client-view.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.js'
  },
  node: {
    fs: 'empty'
  }
};
