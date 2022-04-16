export const entry = "./public/main.js";
export const output = {
  path: __dirname + "/public",
  filename: "/bundle.js"
};
export const module = {
  loader: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react']
    }
  }]
};
export const watch = true;
