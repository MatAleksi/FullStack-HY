import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === '') {
            return state.anecdotes
        }

        return state.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    })
    const voteAnecdote = (id) => {
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
    const dispatch = useDispatch()
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList
