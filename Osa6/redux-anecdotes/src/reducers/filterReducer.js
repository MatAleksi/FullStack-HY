import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: { 
        filterChange(state, filter){
            console.log('filter now: ', filter)
            return filter.payload
        }
    }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer