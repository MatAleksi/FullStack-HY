import { createSlice } from '@reduxjs/toolkit'

const initialNotification = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,
    reducers: {
        set(state, action){
            state = action.payload
            return state
        },
        clear(state,){
            
            state = ''
            return state
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(set(message))
        setTimeout(() => {
            dispatch(clear())
        }, time * 1000)
    }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer