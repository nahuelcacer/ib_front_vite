import { createSlice } from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name: 'login',
    initialState: { loading: false, error: null, user: null, token: null, institution_id: null, customer_id: null, client_id: null, accounts: null, id: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.token = action.payload.token_ib.access_token
            state.institution_id = action.payload.institution_id
            state.customer_id = action.payload.customer_id
            state.client_id = action.payload.client_id
            state.accounts = action.payload.accounts
            state.id = action.payload.id
        }
    }
})

export const { setUser } = loginSlice.actions
export default loginSlice.reducer