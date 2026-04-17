module.exports = function babelConfig(api) {
  api.cache(true);

  const plugins = [];

  if (process.env.NODE_ENV === 'development') {
    try {
      require.resolve('@react-dev-inspector/babel-plugin');
      plugins.push('@react-dev-inspector/babel-plugin');
    } catch {
      // Keep local/dev startup working even if the optional inspector package is absent.
    }
  }

  return {
    presets: [
      [
        'next/babel',
        {
          'preset-react': {
            development: process.env.NODE_ENV === 'development',
          },
        },
      ],
    ],
    plugins,
  };
};
