import { createSlice } from "@reduxjs/toolkit"

export const movanteriorSlice = createSlice({
    name: 'movanterior',
    initialState: { loading: false, error: null, movements: null, filteredMovements: [], date: null },

    reducers: {
        setMovements: (state, action) => {
            state.movements = action.payload
            state.filteredMovements = action.payload.movements_detail
        },

        setFilteredMovements: (state, action) => {
            if (action.payload === '') {
                state.filteredMovements = state.movements.movements_detail;
                return;
            }

            state.filteredMovements = state.movements.movements_detail.filter(
                movement => {
                    if (typeof action.payload === 'string') {
                        return movement.id.toString().includes(action.payload) ||
                            movement.amount.toString().includes(action.payload) ||
                            movement.code_description_bank.toString().includes(action.payload);
                    }
                    return false;
                }
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        reset: (state) => {
            state.filteredMovements = []
            state.movements = null
            state.loading = false
            state.error = null
        }
    }
})

export const { request, select, setMovements, setDate, setFilteredMovements, setLoading, setError } = movanteriorSlice.actions
export default movanteriorSlice.reducer