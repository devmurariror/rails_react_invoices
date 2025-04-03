const esbuild = require("esbuild");
const urlPlugin = require("esbuild-plugin-url");

esbuild.build({
  entryPoints: ["app/javascript/application.js"], // Adjust if your entry file is different
  bundle: true,
  sourcemap: true,
  format: "esm",
  outdir: "app/assets/builds",
  publicPath: "/assets",
  plugins: [
    urlPlugin({
      filter: /\.(png|jpg|jpeg|svg|gif)$/i, // Handles images
      limit: 0, // Ensures images are copied instead of being inlined as base64
    }),
  ],
}).catch(() => process.exit(1));
