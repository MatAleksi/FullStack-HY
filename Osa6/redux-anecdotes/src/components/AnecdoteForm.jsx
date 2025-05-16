import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew= async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name="newAnecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm