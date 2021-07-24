module.exports = {
  presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        cwd: "babelrc",
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@app": "./src",
          "@assets": "./assets",
        },
      },
    ],
  ],
};
