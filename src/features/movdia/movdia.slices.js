import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getMovimientoDia from '../../service/service.movdia'

export const movdiaSlice = createSlice({
    name: 'movdia',
    initialState: { movements: null, loading: false, error: null, filteredMovements: [] },
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

export const fetchMovDia = createAsyncThunk(
    'movdia/fetchMovements',
    async (bankId, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const movements = await getMovimientoDia(bankId);
            dispatch(setMovements(movements));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const { setMovements, setFilteredMovements, setLoading, setError, reset } = movdiaSlice.actions
export default movdiaSlice.reducer