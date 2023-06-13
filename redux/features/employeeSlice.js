import { createSlice } from '@reduxjs/toolkit';

let initialState = null;

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: { },
    extraReducers: (builder) => { }
});

export const { } = employeeSlice.actions;

export default employeeSlice.reducer;