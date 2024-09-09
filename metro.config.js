const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.transformer = {
    ...defaultConfig.transformer,
    babelTransformerPath: 'C:\\Repo 3\\AnciLife\\node_modules\\react-native-svg-transformer\\expo\\index.js',
};
defaultConfig.resolver = {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  };
console.log('----', defaultConfig.transformer)
console.log('------', require.resolve("react-native-svg-transformer/expo"));
module.exports = defaultConfig;

// module.exports = (() => {
//     const config = getDefaultConfig(__dirname);
  
//     const { transformer, resolver } = config;
  
//     config.transformer = {
//       ...transformer,
//       babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
//     };
//     config.resolver = {
//       ...resolver,
//       assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...resolver.sourceExts, "svg"],
//     };
  
//     return config;
//   })();
