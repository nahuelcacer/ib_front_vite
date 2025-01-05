import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getInstitutions } from "../../service/service.instituions"
import { useDispatch } from "react-redux"

export const institutionsSlice = createSlice({
    name: 'institutions',
    initialState: { institutions: [] },
    reducers: {
        setInstitutions: (state, action) => {
            state.institutions = action.payload
        }
    }
})

export const asyncSetInstitutions = createAsyncThunk('institutions/setInstitutions', async () => {
    const dispatch = useDispatch()
    const response = await getInstitutions()
    dispatch(setInstitutions(response.data))
    return response.data
})


export const { setInstitutions } = institutionsSlice.actions
export default institutionsSlice.reducer