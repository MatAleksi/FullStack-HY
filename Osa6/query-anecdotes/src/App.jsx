import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote, createAnecdote } from './components/requests'
import axios from 'axios'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn:  () => axios.get('http://localhost:3001/anecdotes').then(response => response.data),
    retry: 1
  })

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    anecdote.votes += 1
    updateAnecdoteMutation.mutate(anecdote)
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
