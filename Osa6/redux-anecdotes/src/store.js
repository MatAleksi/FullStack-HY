import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { set } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

anecdoteService.getAll().then(anecdotes => store.dispatch(set(anecdotes)))    

console.log('store now', store.getState())
export default store
