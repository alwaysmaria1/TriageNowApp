module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            // root is optional but can help with absolute paths
            root: ['./'],
            alias: {
              // '@' points to your project root
              '@': './',
            },
          },
        ],
      ],
    };
  };
  