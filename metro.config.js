const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('readable-stream'),
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
