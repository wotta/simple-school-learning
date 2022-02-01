import Link from "next/link"

const Courses = ({ courses }) => {
  return (
    <div className="courses">
      <h2>Courses</h2>
      <div className="courses-list grid grid-cols-2 gap-4">
        {courses.map((course) => {
          return (
            <div
              className="rounded bg-gray-200 border border-gray-300 overflow-hidden shadow-xl"
              key={course.id}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <Link href={`/courses/${course.attributes.slug}`}>
                    <a>{course.attributes.name}</a>
                  </Link>
                </div>
                <p className="text-gray-700 text-base">
                  {course.attributes.description}
                </p>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{course.attributes.subject.data.attributes.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Courses
