import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNotificationDispatch } from './components/NotificationContext'
import { updateAnecdote } from './components/requests'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn:  () => axios.get('http://localhost:3001/anecdotes').then(response => response.data),
    retry: 1
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
    
  })
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(updatedAnecdote)
    dispatch({ type: 'SHOW', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
 
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
  console.log('anecdotes', anecdotes)
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
