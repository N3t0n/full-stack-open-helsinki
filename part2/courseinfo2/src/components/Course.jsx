const Course = ({ course }) => {
  const totalEx = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
      <p>Total of {totalEx} exercises</p>
    </>
  )
}

export default Course