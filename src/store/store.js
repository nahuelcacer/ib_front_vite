import { configureStore } from '@reduxjs/toolkit'
import { bankSlice } from '../features/bank/bank.slices'
import { movanteriorSlice } from '../features/movanterior/movanterior.slices'
import { movdiaSlice } from '../features/movdia/movdia.slices'
import { institutionsSlice } from '../features/institutions/institutions.slices' 

export const store = configureStore({
    reducer: {
        bank: bankSlice.reducer,
        movanterior: movanteriorSlice.reducer,
        movdia: movdiaSlice.reducer,
        institutions: institutionsSlice.reducer
    }
})

export default store