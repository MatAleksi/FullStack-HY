import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      dispatch({ type: 'SHOW', payload: `anecdote created` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'anecdote must have at least 5 characters' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const id = Math.round(Math.random() * 10000)
    newAnecdoteMutation.mutate({content, votes: 0, id})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
