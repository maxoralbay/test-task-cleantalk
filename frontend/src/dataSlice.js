// dataSlice.js
import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit';
const BASE_URL = 'http://173.249.58.209:8002/api';
// Create a data object with the payload for the POST request
export const setCalcTriangulate = createAsyncThunk(
    'data/setCalcTriangulate',
    async (data) => {
        const response = await fetch(
            BASE_URL+'/map/calc/triangulate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        return json;
    });

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        payload: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // setCalcTriangulate
            .addCase(setCalcTriangulate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setCalcTriangulate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.payload.length > 0) {
                    state.payload = [];
                }
                state.payload.push(action.payload);

            })
            .addCase(setCalcTriangulate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
});
export const {setFormData} = dataSlice.actions;
export default dataSlice.reducer;