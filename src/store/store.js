import { configureStore } from '@reduxjs/toolkit'
import { bankSlice } from '../features/bank/bank.slices'
import { movanteriorSlice } from '../features/movanterior/movanterior.slices'
import { movdiaSlice } from '../features/movdia/movdia.slices'
import { loginSlice } from '../features/login/login.slices'
import { institutionsSlice } from '../features/institutions/institutions.slices' 

export const store = configureStore({
    reducer: {
        bank: bankSlice.reducer,
        movanterior: movanteriorSlice.reducer,
        movdia: movdiaSlice.reducer,
        login: loginSlice.reducer,
        institutions: institutionsSlice.reducer
    }
})

export default store