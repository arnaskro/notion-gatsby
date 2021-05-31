const path = require(`path`)
const axios = require(`axios`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const result = await graphql(
    `
      {
        allNotionPage(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              title
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allNotionPage.edges

  posts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `NotionPage`) {
    createNodeField({
      name: `slug`,
      node,
      value: node.path
    })
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  if (!process.env.GATSBY_APP_NOTION_DB_ID || !process.env.GATSBY_APP_NOTION_API_SECRET) {
    // eslint-disable-next-line no-console
    console.error(`GATSBY_APP_NOTION_DB_ID or GATSBY_APP_NOTION_API_SECRET is not defined!`)
    return
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_APP_NOTION_API_SECRET}`,
      "Notion-Version": "2021-05-13"
    }
  }
  const requestData = {
    object: "list"
  }

  const data = await axios
    .post(
      `https://api.notion.com/v1/databases/${process.env.GATSBY_APP_NOTION_DB_ID}/query`,
      requestData,
      headers
    )
    .then(res => res.data.results)
    .catch(err => {
      console.error(err)
      return null
    })

  if (data) {
    data
      .map(page => ({
        created_at: page.created_time,
        updated_at: page.last_edited_time,
        path: page.properties["Path"].url,
        title: page.properties["Title"].title[0].plain_text,
        content: page.properties["Content"].rich_text[0].plain_text
      }))
      .forEach(page => {
        const id = createNodeId(`notion-${page.path}`)
        const type = `NotionPage`
        const node = {
          ...page,
          id,
          parent: null,
          children: [],
          internal: {
            type,
            contentDigest: createContentDigest(page.content)
          }
        }
        // create nodes
        actions.createNode(node)
      })
  }
}
