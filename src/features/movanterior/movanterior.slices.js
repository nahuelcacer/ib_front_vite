import { createSlice } from "@reduxjs/toolkit"

export const movanteriorSlice = createSlice({
    name: 'movanterior',
    initialState: {options:[], selected:null, loading:false, error:null, movements:null, filteredMovements:[], date:null},

    reducers: {
        request: (state, action) => {
            state.options = action.payload
        },
        select: (state, action) => {
            state.selected = action.payload
        },
        setMovements: (state, action) => {
            state.movements = action.payload
            state.filteredMovements = action.payload.movements_detail
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setFilteredMovements: (state, action) => {
            if (action.payload === '') {
                state.filteredMovements = state.movements.movements_detail;
                return;
            }
            state.filteredMovements = state.movements.movements_detail.filter(
                movement => {
                    if (typeof action.payload === 'string') {
                        return movement.amount.toLowerCase().includes(action.payload.toLowerCase()) || movement..toLowerCase().includes(action.payload.toLowerCase());
                    }
                }
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { request, select, setMovements, setDate, setFilteredMovements, setLoading, setError } = movanteriorSlice.actions
export default movanteriorSlice.reducer