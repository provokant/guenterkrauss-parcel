module.exports = {
  plugins: [
    // explicit local requires to prevent Parcel from auto-installing a wrapper
    require('./node_modules/tailwindcss'),
    require('./node_modules/autoprefixer'),
  ],
};
