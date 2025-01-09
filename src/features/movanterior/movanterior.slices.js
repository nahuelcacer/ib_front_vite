import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMovimientosAnteriores } from "../../service/service.movanterior";
import { formatDate } from "../../utils/formatter";

export const movanteriorSlice = createSlice({
    name: 'movanterior',
    initialState: { loading: false, error: null, movements: null, filteredMovements: [], date: null, filterStatus: null },

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
        setDate: (state, action) => {
            console.log(action.payload)
            state.date = {
                start: formatDate(action.payload.start),
                end: formatDate(action.payload.end)
            }
        },
        reset: (state) => {
            state.filteredMovements = []
            state.movements = null
            state.loading = false
            state.error = null
            state.date = null
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload
        }
    }
})
export const fetchMovAnterior = createAsyncThunk(
    'movanterior/fetchMovements',
    async (data, { dispatch }) => {
        try {
            console.log(data)
            dispatch(setLoading(true));
            const movements = await getMovimientosAnteriores(data);
            dispatch(setMovements(movements));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);
export const { setMovements, setDate, setFilteredMovements, setLoading, setError, reset, setFilterStatus } = movanteriorSlice.actions
export default movanteriorSlice.reducer