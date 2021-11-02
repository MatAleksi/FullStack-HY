import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.coursename}
            </h1>
        </div>
    )
}
const Content = (props) => {
    return (
        <div>
        <Part name={props.p1.name} amount={props.p1.exercises} />
        <Part name={props.p2.name} amount={props.p2.exercises} />
        <Part name={props.p3.name} amount={props.p3.exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.amount}
            </p>
        </div>
    )
}
const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.e1.exercises + props.e2.exercises + props.e3.exercises}
            </p>
        </div>
    )
}

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

    return (
        <div>
            <Header coursename={course.name} />
            <Content p1={course.parts[0]} p2={course.parts[1]} p3={course.parts[2]} />
            <Total e1={course.parts[0]} e2={course.parts[1]} e3={course.parts[2]} />
        </div>
    )
}

export default App