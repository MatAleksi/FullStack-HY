import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})
console.log('store now', store.getState())
export default store
