import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        const newAnecdote = await anecdoteService.create({
            content: content,
            id: (100000 * Math.random()).toFixed(0),
            votes: 0
        })
        
        dispatch(add(newAnecdote))
        dispatch(setNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="newAnecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm