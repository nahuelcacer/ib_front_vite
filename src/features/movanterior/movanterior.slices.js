import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMovimientosAnteriores } from "../../service/service.movanterior";
import { formatDate } from "../../utils/formatter";

export const movanteriorSlice = createSlice({
    name: 'movanterior',
    initialState: { loading: false, error: null, movements: null, filteredMovements: [], date: null, filterStatus: null, textFilter: '', filterType: null },

    reducers: {
        setMovements: (state, action) => {
            state.movements = action.payload
            state.filteredMovements = action.payload.movements_detail
        },

        setFilteredMovements: (state) => {
            if (!state.movements) return;
            
            let filtered = state.movements.movements_detail;

            if (state.textFilter.trim()) {
                filtered = filtered.filter(movement => {
                    const searchTerm = state.textFilter.toLowerCase();
                    return movement.id.toString().toLowerCase().includes(searchTerm) ||
                        movement.amount.toString().toLowerCase().includes(searchTerm) ||
                        movement.code_description_bank.toString().toLowerCase().includes(searchTerm);
                });
            }

            if (state.filterStatus !== null) {
                filtered = filtered.filter(movement => movement.has_receipt === state.filterStatus);
            }
            
            if (state.filterType !== null) {
                filtered = filtered.filter(movement => movement.operation_code_ib !== state.filterType);
            }
            state.filteredMovements = filtered;
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
            // setFilteredMovements(state, action)
        },
        setTextFilter: (state, action) => {
            state.textFilter = action.payload
            // setFilteredMovements(state, action)
        },
        setFilterType: (state, action) => {
            state.filterType = action.payload
            // setFilteredMovements(state, action)
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
export const { setMovements, setDate, setFilteredMovements, setLoading, setError, reset, setFilterStatus, setTextFilter, setFilterType } = movanteriorSlice.actions
export default movanteriorSlice.reducer