export default {
  tools: {
    rspack: {
      entry: './components/index.js',
      output: {
        filename: 'bundle.js',
        path: './dist',
      },
      optimization: {
        concatenateModules: true,
        // minimize: false,
      },
    },
  },
};