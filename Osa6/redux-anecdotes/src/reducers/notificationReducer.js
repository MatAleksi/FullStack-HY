import { createSlice } from '@reduxjs/toolkit'

const initialNotification = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,
    reducers: {
        setNotification(state, action){
            state = action.payload
            return state
        },
        clearNotification(state,){
            
            state = ''
            return state
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer