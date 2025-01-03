import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getMovimientoDia from "../../service/service.movdia";

export const bankSlice = createSlice({
    name: 'bank',
    initialState: {options:[], selected:null, loading:false, error:null, movements:[]},
    reducers: {
        request: (state, action) => {
            state.options = action.payload
        },
        select: (state, action) => {
            state.selected = action.payload
        },
        setMovements: (state, action) => {
            state.movements = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }   
})
export const fetchBankMovements = createAsyncThunk(
    'bank/fetchMovements',
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
export const { request, select, setMovements, setLoading, setError } = bankSlice.actions
export default bankSlice.reducer