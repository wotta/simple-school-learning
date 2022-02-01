import Image from "next/image"
import { format } from "date-fns"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import { GlobalContext } from "./_app"
import Layout from "../components/layout"
import React, { useContext } from "react"
import ReactMarkdown from "react-markdown"
import Courses from "../components/courses"

const Home = ({ homepage, courses }) => {
  const { navigation } = useContext(GlobalContext)

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

  const date = format(new Date(), "yyyy-MM-dd")

  const [homepageRes, coursesRes] = await Promise.all([
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
      filters: {
        $or: [
          {
            end_date: {
              "$gte": date,
            }
          },
          {
            end_date: { $null: true }
          },
        ]
      }
    }),
  ])

  return {
    props: {
      homepage: homepageRes.data,
      courses: coursesRes.data,
    },
    revalidate: 1,
  }
}

export default Home
