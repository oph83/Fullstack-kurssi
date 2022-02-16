import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
  }
  
  const Content = () => {
    console.log()
    return (
    	<div>
      {course.parts.map(parts => <p>{parts.name} {parts.exercises}</p>)}
      	</div>
    )
  }

  const Total = () => {
    console.log()
    return <p>Number of exercises {sum}</p>
  }

  let sum = course.parts.reduce(function(prev, current) {
    return prev + +current.exercises
  }, 0);
  console.log(sum)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App