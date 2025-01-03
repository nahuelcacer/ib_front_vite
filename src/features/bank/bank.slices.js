import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getMovimientoDia from "../../service/service.movdia";

export const bankSlice = createSlice({
    name: 'bank',
    initialState: {options:[], selected:null},
    // initialState: {options:[], selected:null, loading:false, error:null, movements:null, filteredMovements:[], date:null},
    reducers: {
        request: (state, action) => {
            state.options = action.payload
        },
        select: (state, action) => {
            state.selected = action.payload
        },
        reset: (state) => {
            state.selected = null
        },
        // setMovements: (state, action) => {
        //     state.movements = action.payload
        //     state.filteredMovements = action.payload.movements_detail
        // },
        // setLoading: (state, action) => {
        //     state.loading = action.payload
        // },
        // setError: (state, action) => {
        //     state.error = action.payload
        // },
        // setDate: (state, action) => {
        //     state.date = action.payload
        // },
        // filterMovements: (state, action) => {
        //     if (action.payload === '') {
        //         state.filteredMovements = state.movements.movements_detail;
        //         return;
        //     }

        //     state.filteredMovements = state.movements.movements_detail.filter(
        //         movement => {
        //             if (typeof action.payload === 'string') {
        //                 return movement.id.toString().includes(action.payload) || 
        //                        movement.amount.toString().includes(action.payload) ||
        //                        movement.code_description_bank.toString().includes(action.payload);
        //             }
        //             return false;
        //         }
        //     );
        // }
    }
})
// export const fetchBankMovements = createAsyncThunk(
//     'bank/fetchMovements',
//     async (bankId, { dispatch }) => {
//         try {
//             dispatch(setLoading(true));
//             const movements = await getMovimientoDia(bankId);
//             dispatch(setMovements(movements));
//         } catch (error) {
//             dispatch(setError(error.message));
//         } finally {
//             dispatch(setLoading(false));
//         }
//     }   
// );
export const { request, select, reset } = bankSlice.actions
// export const { request, select, setMovements, setLoading, setError, filterMovements, setDate } = bankSlice.actions
export default bankSlice.reducer