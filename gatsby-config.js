require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['API_ENDPOINT']
      }
    }
  ]
};
