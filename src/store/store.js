import {configureStore} from '@reduxjs/toolkit'
import { bankSlice } from '../features/bank/bank.slices'

export const store = configureStore({
    reducer: {
        bank: bankSlice.reducer
    }
})

export default store