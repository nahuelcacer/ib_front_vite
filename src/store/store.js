import {configureStore} from '@reduxjs/toolkit'
import { bankSlice } from '../features/bank/bank.slices'
import { movanteriorSlice } from '../features/movanterior/movanterior.slices'
import { movdiaSlice } from '../features/movdia/movdia.slices'

export const store = configureStore({
    reducer: {
        bank: bankSlice.reducer,
        movanterior: movanteriorSlice.reducer,
        movdia: movdiaSlice.reducer
    }
})

export default store