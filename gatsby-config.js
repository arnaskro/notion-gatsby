module.exports = {
  pathPrefix: "/notion-gatsby",
  siteMetadata: {
    title: `ELI5`,
    author: {
      name: `@arnaskro`,
      summary: ``
    },
    description: `A simple, test site using Notion APi`,
    siteUrl: `https://arnaskro.github.io/notion-gatsby`,
    social: {
      twitter: `arnaskro`
    },
    defaultImage: "images/bg.jpeg"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_APP_GOOGLE_TRACKING_ID
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ExplainLikeIm5`,
        short_name: `ELI5`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    "gatsby-plugin-dark-mode",
    `gatsby-plugin-postcss`
  ]
}
