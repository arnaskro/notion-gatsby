import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const PostTemplate = ({ data, location }) => {
  const post = data.notionPage

  return (
    <Layout location={location} title="Home">
      <SEO title={post.title} />
      <article>
        <header>
          <h1
            style={{
              marginBottom: 0
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1)
            }}
          >
            {post.created_at}
          </p>
        </header>
        <section>
          {post.content.split("\n").map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </section>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1)
          }}
        />
      </article>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    notionPage(fields: { slug: { eq: $slug } }) {
      id
      title
      content
      created_at(formatString: "MMM DD, YYYY HH:mm")
      updated_at(formatString: "MMM DD, YYYY HH:mm")
    }
  }
`
