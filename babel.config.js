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
module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ]
}