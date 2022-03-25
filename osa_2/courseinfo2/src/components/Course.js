import React from 'react';

const Course = ( {courses} ) => {
    return (
      <div>
        {courses.map(courses =>
        <div key={courses.id}>
        <Header courses={courses} />
        <Content courses={courses} />
        <Total courses={courses} />
        </div>
        )}
      </div>
    )
  }
  
  const Header = ({ courses }) => {
    return (
      <h1>{courses.name}</h1>
    )
  }
  
  const Total = ({ courses }) => {
    const sum = courses.parts.reduce(function(prev, current) {
      return prev + +current.exercises
    }, 0);
    console.log('course sum ' + sum)
    return(
      <h3>Total of exercises {sum}</h3>
    ) 
  }
  
  const Content = ({ courses }) => {
    return (
      <div>
        {courses.parts.map(parts => <p key={parts.id}>{parts.name} {parts.exercises}</p>)}
      </div>
    )
  }

  export default Course