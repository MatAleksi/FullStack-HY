import React, { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handle}>{props.text}</button>
)

const Display = props => {
    return(
        <div>
            <Anecdo anecdote={props.anecdote} />
            <Votes votes={props.votes} />
        </div>
    )
}

const Votes = (props) => <div>has {props.votes} votes.</div>

const Anecdo = (props) => <div>{props.anecdote}</div>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [votes, setVotes] = useState(Array(7).fill(0))

    const [selected, setSelected] = useState(0)

    const handleClickN = () => (
        setSelected(Math.floor(Math.random() * 6))
    )
    const handleClickV = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)       
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button handle={handleClickN} text="Next anecdote" />
            <Button handle={handleClickV} text="Vote" />
            <h1>Anecdote with most votes</h1>
            <Display anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />
        </div>
    )
}

export default App

