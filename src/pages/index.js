// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allNotionPage.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4)
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {node.title}
                </Link>
              </h3>
              <small>{node.created_at}</small>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allNotionPage {
      edges {
        node {
          created_at(formatString: "MMM DD, YYYY HH:mm")
          title
          fields {
            slug
          }
        }
      }
    }
  }
`
