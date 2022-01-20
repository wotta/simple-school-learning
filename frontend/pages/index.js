import React from "react"
import Image from "next/image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import Courses from "../components/courses"
import { fetchAPI, getStrapiURL } from "../lib/api"

const Home = ({ navigation, homepage, courses }) => {
  let content = homepage.attributes.builder.find(
    (item) => item.__component === "builder.content"
  )

  return (
    <Layout navigation={navigation}>
      <Seo seo={homepage.attributes.seo} />
      <div className="container mt-24 md:mt-18 p-8 rounded prose prose-pink prose-sm sm:prose-lg lg:prose-lg xl:prose-2xl mx-auto">
        <main>
          <article>
            <ReactMarkdown
              components={{
                p: function p({ node, children }) {
                  if (node.children[0].tagName === "img") {
                    let image = node.children[0]

                    let imageProps = {
                      ...image.properties,
                    }

                    return (
                      <div
                        className="
          flex w-32 h-32 rounded-full mr-5 ml-3 float-right place-content-start mt-0 overflow-hidden
          [shape-outside: circle(50% at 50% 50%)]
        "
                      >
                        <Image {...imageProps} width={200} height={200} />
                      </div>
                    )
                  }

                  return <p>{children}</p>
                },
              }}
            >
              {content.content}
            </ReactMarkdown>
          </article>

          <Courses courses={courses} />
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [navigationRes, homepageRes, coursesRes] = await Promise.all([
    fetchAPI("/navigation", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        seo: { populate: "*" },
        builder: { populate: "*" },
      },
    }),
    fetchAPI("/courses", {
      populate: {
        subject: { populate: "*" },
      },
    }),
  ])

  return {
    props: {
      navigation: navigationRes.data.attributes.items,
      homepage: homepageRes.data,
      courses: coursesRes.data,
    },
    revalidate: 1,
  }
}

export default Home
