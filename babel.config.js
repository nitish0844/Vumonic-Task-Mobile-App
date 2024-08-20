// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: ['react-native-reanimated/plugin'],
    plugins: [
      [
        'module:react-native-dotenv',

        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
