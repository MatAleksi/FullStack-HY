import React from 'react';


const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const exercises = course.parts.map(part => part.exercises)
    const sum = exercises.reduce((a, b) => a + b, 0)
    return (
        <b>Number of exercises {sum}</b>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = (props) => {
    const { course } = props
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}


export default Course;