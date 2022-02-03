import { format } from "date-fns"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import { GlobalContext } from "./_app"
import Layout from "../components/layout"
import React, { useContext } from "react"
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
              $gte: date,
            },
          },
          {
            end_date: { $null: true },
          },
        ],
      },
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
