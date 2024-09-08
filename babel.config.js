// module.exports = {
//   presets: [
//     'module:@react-native/babel-preset', // React Native preset
//     '@babel/preset-react', // React preset to handle JSX
//     ['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]
//   ],
//   plugins: [
//     '@babel/plugin-proposal-export-namespace-from',
//     ["@babel/plugin-transform-react-jsx", {
//       "runtime": "automatic"
//     }],
//     'react-native-reanimated/plugin', //always at last
//   ],
// };
// module.exports = {
//   presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
//   plugins: [
//     [
//       '@babel/plugin-transform-react-jsx',
//       {
//         runtime: 'automatic',
//       },
//     ],
//     ['react-native-reanimated/plugin'],
//   ]
// }
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Ensure 'react-native-reanimated/plugin' is last
      'react-native-reanimated/plugin',
    ],
  };
};