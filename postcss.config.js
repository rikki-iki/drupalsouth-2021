/* */
module.exports = {
  plugins: [
    // Allow @import for CSS files.
    require("postcss-import"),
    // Convert modern CSS and polyfill where needed.
    require("postcss-preset-env")({
      // Experimental because fun.
      stage: 0,
      // Allows fallback custom property values to be added for IE11.
      importFrom: [
        './css/postcss/_constants.css'
      ]
    }),
  ],
};
