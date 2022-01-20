import { GlobalContext } from "../_app"
import { fetchAPI } from "../../lib/api"
import React, { useContext } from "react"
import Layout from "../../components/layout"

const Course = ({ course }) => {
  const { navigation } = useContext(GlobalContext)

  return (
    <Layout navigation={navigation}>
      <div className="container mt-24 md:mt-18 p-8 rounded prose prose-pink prose-sm sm:prose-lg lg:prose-lg xl:prose-2xl mx-auto">
        <main>
          <article>
            <div>
              <h1>Course</h1>
              <p>{course.attributes.name}</p>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  console.log(params)
  const courseRes = await fetchAPI("/courses", {
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
    populate: {
      content: "*",
    },
  })

  return {
    props: { course: courseRes.data[0] },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  // Run API calls in parallel
  const courses = await fetchAPI("/courses")

  return {
    paths: courses.data.map((_course) => {
      return {
        params: { slug: _course.attributes.slug },
      }
    }),
    fallback: true,
  }
}

export default Course
