import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Get the user from local storage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    mode: 'dark',
     userId: '63701cc1f03239b7f700000e',
    /*  userId: user._id, */
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};




export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;