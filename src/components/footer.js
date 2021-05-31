import React from "react"

const Footer = () => {
  return (
    <footer className="my-12 text-center">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a> and{" "}
      <a href="https://developers.notion.com/docs/getting-started" target="_blank" rel="noreferrer">
        Notion API
      </a>
      . Find the project on <a href="https://github.com/arnaskro/notion-gastby">Github</a>
    </footer>
  )
}

export default Footer
