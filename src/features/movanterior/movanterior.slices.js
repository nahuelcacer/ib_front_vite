import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMovimientosAnteriores } from "../../service/service.movanterior";
import { formatDate } from "../../utils/formatter";

export const movanteriorSlice = createSlice({
    name: 'movanterior',
    initialState: { loading: false, error: null, movements: null, date: null },

    reducers: {
        setMovements: (state, action) => {
            state.movements = action.payload
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
export const { setMovements, setDate, setFilteredMovements, setLoading, setError, reset, setFilterStatus, setTextFilter, setFilterType } = movanteriorSlice.actions
export default movanteriorSlice.reducer