import { format } from "date-fns"
import JSConfetti from "js-confetti"
import { GlobalContext } from "../_app"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import React, { useContext, useMemo, useState } from "react"

const Course = ({ course }) => {
  const { navigation } = useContext(GlobalContext)

  const [validated, setValidated] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [wrongAnswers, setWrongAnswers] = useState([])

  const shuffledQuestions = useMemo(() => {
    return [...course.attributes.content]
      .sort(() => 0.5 - Math.random())
      .map((question) => {
        return {
          ...question,
          answers: [...question.answers].sort(() => 0.5 - Math.random()),
        }
      })
      .slice(0, course.attributes.amount_questions ?? 5)
  }, [course])

  const validateCourse = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const answers = []

    for (let [key, value] of formData.entries()) {
      const question = shuffledQuestions[key]

      const foundAnswer = question.answers.filter((_answer) => {
        return _answer.id === parseInt(value)
      })

      answers.push({
        question_id: key,
        answer_id: value,
        correct: foundAnswer[0].correct,
        question: question,
      })
    }

    setValidated(true)
    setCorrectAnswers(
      answers.filter((answer) => {
        return answer.correct === true
      })
    )
    setWrongAnswers(
      answers.filter((answer) => {
        return answer.correct === false
      })
    )
  }

  const runConfetti = () => {
    new JSConfetti().addConfetti()
  }

  return (
    <Layout navigation={navigation}>
      <div className="container mt-24 md:mt-18 p-8 rounded prose prose-pink prose-sm sm:prose-lg lg:prose-lg xl:prose-2xl mx-auto">
        <main>
          <article>
            <div>
              <h1>Oefenopdracht:</h1>
              <h3>{course.attributes.name}</h3>
              {validated && (
                <div
                  className={`${
                    correctAnswers.length === shuffledQuestions.length
                      ? "bg-green-500"
                    : "bg-gray-200 border-gray-300"
                  }  rounded border overflow-hidden shadow-xl px-6 py-4`}
                >
                  <p>
                    Je hebt {correctAnswers.length} van de{" "}
                    {shuffledQuestions.length} vragen goed
                  </p>

                  {wrongAnswers.length > 0 && (
                    <>
                      <p>Bij de volgende vragen heb je een fout antwoord ingevuld</p>
                      {wrongAnswers.map((answer, _key) => {
                        return (
                          <details key={_key}>
                            <summary>{answer.question.question}<strong>: {answer.question.answers.find((_answer) => _answer.id === parseInt(answer.answer_id)).answer}</strong></summary>
                            Het goede antwoord is: <strong>{answer.question.answers.find((_answer) => _answer.correct === true).answer}</strong>
                          </details>
                        )
                      })}
                    </>
                  )}

                  {correctAnswers.length === shuffledQuestions.length && (
                    <>
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            height: 0,
                            paddingBottom: "56.25%",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <iframe
                            allowFullScreen=""
                            allow="autoplay"
                            frameBorder="0"
                            height="100%"
                            src="https://giphy.com/embed/bq1PRO9CLPHmURBvv2/video"
                            style={{
                              left: 0,
                              position: "absolute",
                              top: 0,
                            }}
                            width="100%"
                            onLoad={runConfetti}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {validated === false && (
                <div className="rounded bg-gray-200 border border-gray-300 overflow-hidden shadow-xl">
                  <form className="px-6 py-4" onSubmit={validateCourse}>
                    {shuffledQuestions.map((item, index) => {
                      return (
                        <div key={index}>
                          <p>{item.question}</p>
                          {item.answers.map((_answer, _index) => {
                            return (
                              <div key={_index}>
                                <label>
                                  <input
                                    type="radio"
                                    name={`${index}`}
                                    value={_answer.id}
                                  />{" "}
                                  {_answer.answer}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mt-2 rounded">
                      Nakijken
                    </button>
                  </form>
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const courseRes = await fetchAPI("/courses", {
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
    populate: {
      content: {
        populate: "*",
      },
    },
  })

  return {
    props: {
      course: courseRes.data[0],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const date = format(new Date(), "yyyy-MM-dd")

  const courses = await fetchAPI("/courses", {
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
  })

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
