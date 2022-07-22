module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": [
          "./src"
        ],
        "alias": {
          "src": "./src",
          "components": "./src/components",
          "assets": "./src/assets",
          "app": "./src/app",
          "features": "./src/features"
        }
      }
    ]
  ]
};
